module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`
      }
    },
    `gatsby-transformer-remark`,
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
