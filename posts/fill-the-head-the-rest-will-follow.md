---
title: "Fill The Head The Rest Will Follow"
date: "2019-12-20"
published: false
---

In the previous post I created a basic website, this post is about filling it up.

## Helmet

```shell
npm install --save gatsby-plugin-react-helmet react-helmet
```

`gatsby-config.js`

```js
module.exports = {
  plugins: [`gatsby-plugin-react-helmet`]
};
```

`index.js`

```js
import React from "react";
import { Helmet } from "react-helmet";

export default () => (
  <>
    <Helmet>
      <title>My Website</title>
      <meta name="description" content="The description of my website" />
    </Helmet>
    <div>Hello world!</div>
  </>
);
```

I started with stuffing the `<head>`. This is not something trivial using React, but Gatsby has a [plugin](https://www.gatsbyjs.org/plugins/) for just about everything.

Adding a plugin to Gatsby is as simple as installing it and adding it to `gatsby-config.js`.

I use [gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/) and they use [react-helmet](https://github.com/nfl/react-helmet).

In `index.js` I added the title and some metadata of my website. Let's hope I can handle all the traffic coming from [Google](https://www.google.com/) now that I have [SEO](https://support.google.com/webmasters/answer/7451184?hl=en).

## GraphQL

`gatsby-config.js`

```js
module.exports = {
  siteMetadata: {
    title: `My Website`,
    siteUrl: `https://my.web.site`,
    description: `The best website in the world`
  },
  plugins: [`gatsby-plugin-react-helmet`]
};
```

`use-site-metadata.js`

```js
import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const {
    site: {
      siteMetadata: { title, siteUrl, description }
    }
  } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            siteUrl
            description
          }
        }
      }
    `
  );
  return { title, siteUrl, description };
};
```

`index.js`

```js
import React from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export default () => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div>Hello world!</div>
    </>
  );
};
```

## Manifest

```shell
npm install --save gatsby-plugin-manifest
```

`gatsby-config.js`

```js
const siteMetadata = {
  title: `My Website`,
  siteUrl: `https://my.web.site`,
  description: `The best website in the world`
};

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: `Short`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/images/icon.svg`
      }
    }
  ]
};
```

```js
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `My Website Title`,
        short_name: `Short`,
        start_url: `/`,
        background_color: `#266dd3`,
        theme_color: `#353535`,
        display: `standalone`,
        icon: `src/images/icon.svg`
      }
    }
  ]
};
```
