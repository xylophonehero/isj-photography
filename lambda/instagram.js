const axios = require('axios');

require('dotenv').config();

exports.handler = function instagram(event, context, callback)
{
  const endpoint = 'https://graph.instagram.com';
  const userId = '17841401783616660';
  const fields = 'id,media_url,permalink';
  const token = process.env.INSTAGRAM_TOKEN;
  const limit = 6;
  const url = `${endpoint}/${userId}/media/?fields=${fields}&access_token=${token}&limit=${limit}`;

  axios
    .get(url)
    .then(({ data: { data: posts } }) =>
    {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          posts.map(i => ({
            id: i.id,
            url: i.media_url,
            permalink: i.permalink,
          })),
        ),
      })
    })
    .catch((e) =>
    {
      callback(e)
    })
}