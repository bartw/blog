import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({
  data: {
    markdownRemark: {
      frontmatter: { title, date },
      html
    }
  }
}) => {
  return (
    <Layout>
      <section className="bg-white text-black p-10">
        <header>
          <h1 className="font-bold">{title}</h1>
          <time className="mt-2 text-sm text-gray-600" dateTime={date}>
            {date}
          </time>
        </header>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;
