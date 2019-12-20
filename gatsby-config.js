module.exports = {
  siteMetadata: {
    title: `Bart Wijnants' Blog`,
    siteUrl: `https://dev.bartwijnants.be`,
    description: `Blog of Bart Wijnants`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`
      }
    },
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
                    excerpt,
                    fields: { slug },
                    frontmatter: { title, date }
                  }
                }) => {
                  const url = `${siteUrl}${slug}`;
                  return {
                    date,
                    title,
                    description: excerpt,
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
                      excerpt(pruneLength: 250)
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Bart Wijnants' Blog"
          }
        ]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bart Wijnants' Blog`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/logo.svg`
      }
    }
  ]
};
