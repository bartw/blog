---
title: "Tailwind"
date: "2019-12-23"
repo: "https://github.com/bartw/tailwind"
summary: "Use the Tailwind CSS framework in a Gatsby site."
published: true
---

Now that I have real website with great SEO, it is time to make it look great too.

I thought about creating all styling from scratch, but that is a lot of work. Instead I searched for a [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) framework that can do the heavy lifting for me.

I looked at [Bulma](https://bulma.io/), [Tachyons](https://tachyons.io/) and [Tailwind](https://tailwindcss.com/). I chose Tailwind, for no particular reason but I had to choose something.

I hope I won't regret it.

The code in this post continues where the [code](https://github.com/bartw/fill-the-head-the-rest-will-follow) from the previous post stopped.

There is no Tailwind plugin for Gatsby but it is still not quite hard to get it working. Gatsby even has a [documentation page](https://www.gatsbyjs.org/docs/tailwind-css/) on how to do it!

I will still write down how I did it though.

```shell
npm install --save tailwindcss gatsby-plugin-postcss
npx tailwind init
touch postcss.config.js
touch src/global.css
touch gatsby-browser.js
```

I first installed the Tailwind npm package and the [gatsby-plugin-postcss](https://www.gatsbyjs.org/packages/gatsby-plugin-postcss/) plugin.

[PostCSS](https://postcss.org/) is a tool for transforming CSS with Javascript. It is the CSS transformer that Tailwind uses under the hood so it seems logical to use this instead of [CSS-in-JS](https://cssinjs.org/) or [SCSS](https://sass-lang.com/).

`tailwind.config.js`

```js
module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
```

The `tailwind.config.js` file was generated when I ran the `npx tailwind init` command. [Npx](https://www.npmjs.com/package/npx) is an easy way to run one of scripts without having to install any npm dependencies.

`postcss.config.js`

```js
module.exports = () => ({
  plugins: [require("tailwindcss")]
});
```

All this file does is configure PostCSS to use Tailwind.

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
    `gatsby-plugin-postcss`,
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

As with all Gatsby plugins I had to add it to my `gatsby-config.js`.

`global.css`

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

`gatsby-browser.js`

```js
import "./src/global.css";
```

I created a `global.css` file to load all Tailwind dependencies and then used [gatsby-browser.js](https://www.gatsbyjs.org/docs/api-files-gatsby-browser/) to include `global.css` on all pages.

`index.js`

```js
import React from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export default () => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="p-20">
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="mt-4">Hello world!</div>
      </div>
    </>
  );
};
```

When I start my site again, it already looks different. Without adding any styles, Tailwind already does some resets and sets some defaults.

Adding Tailwind classes to my html elements also works.

Time to submit my site to [awwwards](https://www.awwwards.com/).
