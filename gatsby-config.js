require("dotenv").config({
  path: `.env`
})

module.exports = {
  siteMetadata: {
    title: 'ISJ Photography | Professional Essex based photographer',
    description:
      'Essex based photographer specialising in capturing family milestones including weddings, newborn shot and family portraits.',
    siteUrl: 'https://isjphotography.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-preload-fonts',
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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
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
        albumsTitles: ["Wedding", "Engagement", "Maternity", "Newborn", "Family", "Landing", "Cake Smash", "Sitters", "Hair and Makeup", "Down on the Dancefloor", "Simply You", "The Prep", "Little Details", "The Ceremony", "Those Moments", "Headshots", "Prom Package", "Mini Session"],
        photosMaxWidth: 1024,
        debug: true,
        pageSizePhotos: 10
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
        purgeOnly: ['/all.scss'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
