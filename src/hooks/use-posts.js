import { useStaticQuery, graphql } from "gatsby";

export const usePosts = () => {
  const {
    allMarkdownRemark: { edges }
  } = useStaticQuery(
    graphql`
      query Posts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { published: { eq: true } } }
        ) {
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
                summary
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
        frontmatter: { title, date, formattedDate, summary }
      }
    }) => ({
      id,
      slug,
      title,
      date,
      formattedDate,
      summary
    })
  );
};
