import { useStaticQuery, graphql } from "gatsby";

export const usePosts = () => {
  const {
    allMarkdownRemark: { edges }
  } = useStaticQuery(
    graphql`
      query Posts {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                date
                repo
              }
              excerptAst(pruneLength: 250)
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
        frontmatter: { title, date, repo },
        excerptAst
      }
    }) => ({
      id,
      slug,
      title,
      date,
      repo,
      excerptAst
    })
  );
};
