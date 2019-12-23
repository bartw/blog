import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Section from "../components/section";
import FullPost from "../components/full-post";

export default ({
  data: {
    markdownRemark: {
      frontmatter: { title, date, formattedDate, repo },
      htmlAst
    }
  }
}) => {
  return (
    <Layout>
      <Section>
        <FullPost
          title={title}
          date={date}
          formattedDate={formattedDate}
          repo={repo}
          htmlAst={htmlAst}
        />
      </Section>
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
        repo
      }
      htmlAst
    }
  }
`;
