---
title: "What's a blog without some posts"
date: "2019-12-26"
repo: "https://github.com/bartw/whats-a-blog-without-some-posts"
summary: "Turn a Gatsby site into a blog with posts in Markdown."
published: true
---

I was going to build a blog about building a blog but so far I've only got a website.

This post will turn my website into a blog by adding posts to it.

The code in this post continues where the [code](https://github.com/bartw/tailwind) from the previous post stopped.

## Turn a Markdown file to a page

I'm going to write my posts in [Markdown](https://daringfireball.net/projects/markdown/).

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

I created a new folder posts and added a really simple Markdown file to it. At the top of the Markdown file there some frontmatter. The frontmatter is metadata about the post. For starters I went with the title and the date as frontmatter.

Now I'm going to add this post to my site.

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
    // highlight-start
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`
      }
    },
    `gatsby-transformer-remark`
    // highlight-end
  ]
};
```

Offcourse I started with adding some plugins, [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/) and [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/).

I added the plugins to `gatsby-config.js` and told `gatsby-source-filesystem` where to find my posts.

These plugins now make sure all `.md` files in the `posts` directory are queryable by GraphQL.

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

The [gatsby-node.js](https://www.gatsbyjs.org/docs/api-files-gatsby-node/) runs while building my site.

I use it to do 2 things, add an extra field to my Markdown posts and create a page for each Markdown post.

The field I want to add is the [slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) field.

To create a page for each post I query all Markdown posts and for each of them use the [createPage](https://www.gatsbyjs.org/docs/actions/#createPage) action that Gatsby provides. To know how to render a post I use a template component.

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

The `post.js` template component uses the post slug to query the post data.

The `gatsby-transformer-remark` turns the Markdown into html that can be inserted into a div in a [dangerous](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) way.

```shell
npm start
```

Now I can start my website and browse to `http://localhost:8000/my-first-post` to see it in action.

Nice.

## List all posts

On my home page I want to have a list of all my posts. To make this a little more visible I'll first create some more dummy posts.

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
        // highlight-start
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
        // highlight-end
      </div>
    </>
  );
};
```

I created a `use-posts.js` hook that uses GraphQL to query all my posts and included that hook into the `index.js` file.
Then I mapped each post with a link.

Clean and easy.

## Layout

My website is now a real blog. But the posts seem a little disconnected from the homepage.

To make it all look better, I'm going to create a layout for my pages.

```shell
mkdir src/components
touch src/components/layout.js
```

`layout.js`

```js
import React from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export default ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="p-20">
        <h1 className="font-bold text-xl">{title}</h1>
        {children}
      </div>
    </>
  );
};
```

I just extracted the parts I want to repeat on my post pages from my homepage.

`index.js`

```js
import React from "react";
import { Link } from "gatsby";
import { usePosts } from "../hooks/use-posts";
import Layout from "../components/layout";

export default () => (
  // highlight-next-line
  <Layout>
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
  // highlight-next-line
  </Layout>
);
```

Then in `index.js` I can replace thoe parts with my new `Layout` component.

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
    // highlight-next-line
    <Layout>
      <div className="mt-4">
        <time dateTime={date}>{formattedDate}</time>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    // highlight-next-line
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

In `post.js` I can wrap the content with the `Layout` component.

Now all my pages look like they belong together. I love React.
