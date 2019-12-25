---
title: "What's a blog without some posts"
date: "2019-12-25"
repo: "https://github.com/bartw/whats-a-blog-without-some-posts"
summary: "Turn a Gatsby site into a blog with posts in Markdown."
published: false
---

## Turn a Markdown file to a page

```shell
mkdir posts
touch posts/my-first-post.md
```

`my-first-post.md`

```markdown
---
title: "My first post"
date: "2019-12-23"
---

## subtitle

A paragraph of text with a [link](https://dev.bartwijnants.be/).
```

```shell
npm install --save gatsby-source-filesystem gatsby-transformer-remark
touch gatsby-node.js
mkdir src/templates
touch src/templates/post.js
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
    `gatsby-transformer-remark`
  ]
};
```

`post.js`

```js
import React from "react";
import { graphql } from "gatsby";

export default ({
  data: {
    markdownRemark: {
      frontmatter: { title, date, formattedDate },
      html
    }
  }
}) => {
  return (
    <div>
      <time dateTime={date}>{formattedDate}</time>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
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

`gatsby-node.js`

```js
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: { slug: node.fields.slug }
    });
  });
};
```

```shell
npm start
```

Browse to `http://localhost:8000/my-first-post`

## List all posts

```shell
touch posts/my-second-post.md
touch posts/my-third-post.md
```

`my-second-post.md`

```markdown
---
title: "My second post"
date: "2019-12-24"
---

## subtitle

The text of my second post.
```

`my-third-post.md`

```markdown
---
title: "My third post"
date: "2019-12-25"
---

## subtitle

The text of my third post.
```

`use-posts.js`

```js
import { useStaticQuery, graphql } from "gatsby";

export const usePosts = () => {
  const {
    allMarkdownRemark: { edges }
  } = useStaticQuery(
    graphql`
      query Posts {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                date
                formattedDate: date(formatString: "MMMM Do, YYYY")
              }
            }
          }
        }
      }
    `
  );
  return edges.map(
    ({
      node: {
        id,
        fields: { slug },
        frontmatter: { title, date, formattedDate }
      }
    }) => ({
      id,
      slug,
      title,
      date,
      formattedDate
    })
  );
};
```

`index.js`

```js
import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { usePosts } from "../hooks/use-posts";

export default () => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="p-20">
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="mt-4">Hello world!</div>
        <div className="mt-4">
          {usePosts().map(({ id, slug, title, date, formattedDate }) => (
            <div key={id} className="mt-2">
              <time dateTime={date}>{formattedDate}</time>
              <Link to={slug}>
                <h1>{title}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
```
