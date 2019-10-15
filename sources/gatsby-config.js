'use strict';
const proxy = require('http-proxy-middleware');
const crafterURL = process.env.CRAFTER_URL || 'http://localhost:8080';

const siteConfig = require('./config.js');
const postCssPlugins = require('./postcss-config.js');

module.exports = {
  pathPrefix: siteConfig.pathPrefix,
  siteMetadata: {
    url: siteConfig.url,
    title: siteConfig.title,
    subtitle: siteConfig.subtitle,
    copyright: siteConfig.copyright,
    disqusShortname: siteConfig.disqusShortname,
    menu: siteConfig.menu,
    author: siteConfig.author
  },
  developMiddleware: (app) => {
    app.use("/static-assets", proxy({ target: crafterURL }));
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "cms",
        fieldName: "CrafterCMS",
        url: "http://localhost:8080/api/1/site/graphql?crafterSite="+process.env.crafterSiteId,
        refetchInterval: 3,
      },
    },

  /*
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/media`,
        name: 'media'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'css',
        path: `${__dirname}/static/css`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static`
      }
    },*/
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                site_url: url
                title_t
                description_t: subtitle
              }
            }
          }
        `,
        feeds: [{
          serialize: ({ query: { site, allCrafterCmsPage } }) => (
            allCrafterCmsPage.edges.map((edge) => Object.assign({}, edge.node, {
              description: edge.node.description_t,
              date: edge.node.createdDate,
              url: "X", //site.siteMetadata.site_url + edge.node.url,
              guid: site.siteMetadata.site_url + edge.node.localId,
              custom_elements: [{ 'content:encoded': edge.node.body_html }]
            }))
          ),
          query: `
              {
                allCrafterCmsPage{ 
                  #(
                  #limit: 1000,
                  #sort: { order: DESC, fields: [frontmatter___date] },
                  #filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
                #)
                 {
                  edges {
                    node {
                      body_html
                        slug_s
                        title_t
                        createdDate
                        template
                        draft
                        description
                        url
                    }
                  }
                }
              }
            `,
          output: '/rss.xml'
        }]
      }
    },



/*
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-katex',
            options: {
              strict: 'ignore'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              withWebp: true,
              ignoreFileExtensions: [],
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-external-links'
        ]
      }
    },
*/
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [siteConfig.googleAnalyticsId],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl: url
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: 'daily',
          priority: 0.7
        }))
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteConfig.title,
        short_name: siteConfig.title,
        start_url: '/',
        background_color: '#FFF',
        theme_color: '#F7A046',
        display: 'standalone',
        icon: 'static/photo.jpg'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [...postCssPlugins],
        cssLoaderOptions: {
          camelCase: false,
        }
      }
    },
    'gatsby-plugin-flow'
  ]
};
