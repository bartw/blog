---
title: "Fill The Head The Rest Will Follow"
date: "2019-12-20"
repo: "https://github.com/bartw/fill-the-head-the-rest-will-follow"
published: true
---

In the previous post I created a basic website, this post is about filling it up.

I started with stuffing the `<head>`. This is not something trivial using React, but Gatsby has a [plugin](https://www.gatsbyjs.org/plugins/) for just about everything.

Adding a plugin to Gatsby is as simple as installing it and adding it to `gatsby-config.js`.

The code in this post continues where the [code](https://github.com/bartw/gatsby-from-scratch) from the previous post stopped.

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

I use [gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/) and they use [react-helmet](https://github.com/nfl/react-helmet).

In `index.js` I added the title and some metadata of my website. Let's hope I can handle all the traffic coming from [Google](https://www.google.com/) now that I have [SEO](https://support.google.com/webmasters/answer/7451184?hl=en).

## GraphQL

The title and description of my website seems like data that I might need mutliple times in different places.

Gatsby uses [GraphQL](https://graphql.org/) to reuse common data in different places.

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

I centralized the metadata of my site in a `siteMetadata` object in `gatsby-config.js`. This makes the data accessible for [static queries](https://www.gatsbyjs.org/docs/static-query/).

```shell
mkdir src/hooks
touch src/hooks/use-site-metadata.js
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
      <h1>{title}</h1>
      <div>Hello world!</div>
    </>
  );
};
```

I created a [custom react hook](https://reactjs.org/docs/hooks-custom.html) to use my site metadata in different components. It is just a little extra abstraction on top of the `useStaticQuery` hook provided by Gatsby.

## Manifest

I expect everyone to add my blog on their phone homescreen. This means it needs to some extra stuff, [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) stuff. I don't really think it will see a lot of use but it's so easy to do with Gatsby so I'm just going ahead with it.

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

I installed the [gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/) plugin and added some configuration to `gatsby-config.js`.

Now when I add my site to my phone's homescreen it has a nice splash screen.
