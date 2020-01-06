---
title: "Better Posts With Prismjs And Rehype-React"
date: "2020-01-01"
repo: "https://github.com/bartw/better-posts-with-prismjs-and-rehype-react"
summary: "Improve Markdown to HTML parsing with syntax highlighting using Prismjs and custom React components using rehype-react"
published: true
---

I've got a real blog going with easy Markdown posts. But the posts look dull.

Time to spice them up.

The code in this post continues where the [code](https://github.com/bartw/whats-a-blog-without-some-posts) from the previous post stopped.

## Tailwind to the rescue

I've got a CSS framework in place to help me with styling. So I'll use that to improve the looks of my posts.

```js:title=src/pages/index.js
import React from "react";
import { Link } from "gatsby";
import { usePosts } from "../hooks/use-posts";
import Layout from "../components/layout";

export default () => (
  <Layout>
    <div className="mt-4">Hello world!</div>
    <div className="mt-4">
      {usePosts().map(({ id, slug, title, date, formattedDate }) => (
        <div key={id} className="mt-2">
          // highlight-start
          <time dateTime={date} className="text-sm text-gray-600">
            {formattedDate}
          </time>
          // highlight-end
          <Link to={slug}>
            // highlight-next-line
            <h1 className="font-bold text-lg">{title}</h1>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
);
```

```js:title=src/templates/post.js
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({
  data: {
    markdownRemark: {
      frontmatter: { title, date, formattedDate },
      html
    }
  }
}) => {
  return (
    <Layout>
      <div className="mt-4">
        // highlight-start
        <time dateTime={date} className="text-sm text-gray-600">
          {formattedDate}
        </time>
        <h1 className="font-bold text-lg">{title}</h1>
        <div className="mt-2" dangerouslySetInnerHTML={{ __html: html }} />
        // highlight-end
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        formattedDate: date(formatString: "MMMM Do, YYYY")
      }
      html
    }
  }
`;
```

I made the dates a little lighter and the titles a little bolder. Everything is looking a lot nicer now. But there is still something off. The subtitles and the links in my posts are unstyled. And I can't style them because the HTML is being generated from the Markdown.

## Do believe the hype

Of course there is a package to handle this problem, [rehype-react](https://github.com/rehypejs/rehype-react). Rehype-react uses [rehype](https://github.com/rehypejs/rehype) to transform to React.

```shell
npm install --save rehype-react
```

```js:title=src/templates/post.js
import React from "react";
import { graphql } from "gatsby";
// highlight-next-line
import rehypeReact from "rehype-react";
import Layout from "../components/layout";

// highlight-start
const Paragraph = ({ children }) => <p className="mt-2">{children}</p>;

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline"
  >
    {children}
  </a>
);

const Subtitle = ({ children }) => (
  <h2 className="mt-2 font-semibold">{children}</h2>
);

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { p: Paragraph, a: ExternalLink, h2: Subtitle }
}).Compiler;
// highlight-end

export default ({
  data: {
    markdownRemark: {
      frontmatter: { title, date, formattedDate },
      // highlight-next-line
      htmlAst
    }
  }
}) => {
  return (
    <Layout>
      <div className="mt-4">
        <time dateTime={date} className="text-sm text-gray-600">
          {formattedDate}
        </time>
        <h1 className="font-bold text-lg">{title}</h1>
        // highlight-next-line
        <div className="mt-2">{renderAst(htmlAst)}</div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        formattedDate: date(formatString: "MMMM Do, YYYY")
      }
      // highlight-next-line
      htmlAst
    }
  }
`;
```

I installed the `rehype-react` package and imported it in my `post.js` file.

There are 3 elements that I want to customize `<p>`, `<a>` and `<h2>`. I created a React component for each of them.

To enable rehype to use these custom React components I query `htmlAst` ([abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) instead of `html`.

The `html` looked like this:

```html
<h2>subtitle</h2>
<p>
  A paragraph of text with a <a href="https://dev.bartwijnants.be/">link</a>.
</p>
```

and `htmlAst` looks like this:

```json
{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tagName": "h2",
      "properties": {},
      "children": [
        {
          "type": "text",
          "value": "subtitle"
        }
      ]
    },
    {
      "type": "text",
      "value": "\n"
    },
    {
      "type": "element",
      "tagName": "p",
      "properties": {},
      "children": [
        {
          "type": "text",
          "value": "A paragraph of text with a "
        },
        {
          "type": "element",
          "tagName": "a",
          "properties": {
            "href": "https://dev.bartwijnants.be/"
          },
          "children": [
            {
              "type": "text",
              "value": "link"
            }
          ]
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    }
  ],
  "data": {
    "quirksMode": false
  }
}
```

I then created a `renderAst` function that uses the abstract syntax tree to render a React component that uses my custom components.

I'm quite hyped about this.

## Code mode

My fourth post contains some code.

````markdown:title=posts/my-fourth-post.md
---
title: "My fourth post"
date: "2020-01-01"
---

A short intro

## subtitle

The text of my fourth post.

```js
const code = "this is code";

const execute = code => {
  console.log(code);
};

execute(code);
```
````

This code is transformed to html like this:

```html
<pre><code class="language-js">const code = "this is code";

const execute = code =&gt; {
  console.log(code);
};

execute(code);
</code></pre>
```

Tailwind has some support for this and styles it with a [monospace font](https://en.wikipedia.org/wiki/Monospaced_font).

But I want to have some quality syntax highlighting in there. To enable syntax highlighting I'm going to use [Prism](https://prismjs.com/).

```shell
npm install --save gatsby-remark-prismjs prismjs
```

```js:title=gatsby-config.js
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
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`
      }
    },
    // highlight-start
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`]
      }
    }
    // highlight-end
  ]
};
```

```js:title=gatsby-browser.js
import "./src/styles/global.css";
// highlight-next-line
import "prismjs/themes/prism-tomorrow.css";
```

I installed [gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/) and `prismjs`. And added `gatsby-remark-prismjs` as a plugin of `gatsby-transformer-remark` in `gatsby-config.js`.

In `gatsby-browser.js` I imported `prism-tomorrow.css`, this is one of the built-in themes.

And that's all I needed to get proper syntax highlighting.

## Line highlighting

To enable [line highlighting](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#optional-add-line-highlighting-styles) there is some extra work required.

````markdown:title=posts/my-fourth-post.md
---
title: "My fourth post"
date: "2020-01-01"
---

A short intro

## subtitle

The text of my fourth post.

```js
const code = "this is code";

const execute = code => {
  // highlight-next-line
  console.log(code); // this should be really long just so we can see highlighting works
};

execute(code);
```
````

```shell
touch src/highlight.css
```

```css:title=src/highlight.css
.gatsby-highlight-code-line {
  background-color: #454545;
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid #f99;
}

.gatsby-highlight {
  background-color: #2d2d2d;
  border-radius: 0.3em;
  margin: 0.5em 0;
  padding: 1em;
  overflow: auto;
}

.gatsby-highlight pre[class*="language-"] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left;
  min-width: 100%;
}
```

```js:title=gatsby-browser.js
import "./src/styles/global.css";
import "prismjs/themes/prism-tomorrow.css";
// highlight-next-line
import "./src/highlight.css";
```

I created a separate `highlight.css` file to add to extra css required to make highlighting work and also imported it in `gatsby-browser.js`.

Now I have a trendy tech blog.
