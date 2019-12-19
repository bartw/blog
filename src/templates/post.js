import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Section from "../components/section";
import Post from "../components/post";

export default ({
  data: {
    markdownRemark: {
      fields: { slug },
      frontmatter: { title, date },
      htmlAst
    }
  }
}) => {
  return (
    <Layout>
      <Section>
        <Post slug={slug} title={title} date={date} htmlAst={htmlAst} />
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date
      }
      htmlAst
    }
  }
`;
