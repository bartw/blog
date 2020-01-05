const title = `Bart Wijnants' Blog`;

module.exports = {
  siteMetadata: {
    title,
    siteUrl: `https://dev.bartwijnants.be`,
    description: `Blog of Bart Wijnants`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-154870199-1",
        head: false,
        anonymize: true,
        respectDNT: true,
        cookieExpires: 0,
        forceSSL: true,
        storeGac: false,
        allowAdFeatures: false
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images`
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site: {
                  siteMetadata: { siteUrl }
                },
                allMarkdownRemark: { edges }
              }
            }) =>
              edges.map(
                ({
                  node: {
                    fields: { slug },
                    frontmatter: { title, date, summary }
                  }
                }) => {
                  const url = `${siteUrl}${slug}`;
                  return {
                    date,
                    title,
                    description: summary,
                    url,
                    guid: url
                  };
                }
              ),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      fields { slug }
                      frontmatter {
                        title
                        date
                        summary
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title
          }
        ]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-images`, `gatsby-remark-prismjs`]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/images/logo.svg`
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`
  ]
};
