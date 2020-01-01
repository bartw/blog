---
title: "Better Posts With Prismjs And Rehype-React"
date: "2020-01-01"
repo: "https://github.com/bartw/better-posts-with-prismjs-and-rehype-react"
summary: "Improve Markdown to HTML parsing with syntax highlighting using Prismjs and custom React components using rehype-react"
published: false
---

I've got a real blog going with easy Markdown posts. But the posts look dull.

Time to spice them up.

The code in this post continues where the [code](https://github.com/bartw/whats-a-blog-without-some-posts) from the previous post stopped.

## Tailwind to the rescue

I've got a CSS framework in place to help me with styling. So I'll use that to improve the looks of my posts.

`index.js`

```js
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

`post.js`

```js
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

`post.js`

```js
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
