---
title: "Tailwind"
date: "2019-12-21"
published: false
---

Now that I have real website with great SEO, it is time to make it look great too.

I thought about creating all styling from scratch, but that is a lot of work. Instead I searched for a [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) framework that can do the heavy lifting for me.

I looked at [Bulma](https://bulma.io/), [Tachyons](https://tachyons.io/) and [Tailwind](https://tailwindcss.com/). I chose Tailwind, for no particular reason but I had to choose something.

I hope I won't regret it.

The code in this post continues where the [code](https://github.com/bartw/fill-the-head-the-rest-will-follow) from the previous post stopped.

```shell
npm install --save tailwindcss gatsby-plugin-postcss
npx tailwind init
touch postcss.config.js
touch src/global.css
```

`postcss.config.js`

```js
module.exports = () => ({
  plugins: [require("tailwindcss")]
});
```

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
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
```

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
