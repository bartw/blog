module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bart Wijnants' Blog`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#333333`,
        theme_color: `#19A974`,
        display: `standalone`,
        icon: `src/images/logo.svg`
      }
    }
  ]
};
