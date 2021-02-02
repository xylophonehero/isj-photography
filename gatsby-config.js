require("dotenv").config({
  path: `.env`
})

module.exports = {
  siteMetadata: {
    title: 'ISJ Photography',
    description:
      'Essex based photographer specialising in capturing moments between couples, parents and children.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              linkImagesToOriginal: false,
              wrapperStyle: 'max-width: 600px'
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    `gatsby-plugin-smoothscroll`,
    // {
    //   resolve: `gatsby-source-instagram`,
    //   options: {
    //     username: `1706299453`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-instagram-all`,
    //   options: {
    //     access_token: process.env.INSTAGRAM_TOKEN
    //   }
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/ // See below to configure properly
        }
      }
    },
    {
      resolve: "gatsby-source-google-photos",
      options: {
        albumsTitles: ["Wedding", "Engagement", "Maternity", "Newborn", "Family", "Landing", "Cake Smash", "Sitters", "Hair and Makeup", "Down on the Dancefloor", "Simply You", "The Prep", "Little Details", "The Ceremony", "Those Moments", "Headshots"],
        photosMaxWidth: 1024,
        debug: true
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
