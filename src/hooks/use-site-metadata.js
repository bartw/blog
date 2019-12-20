import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const {
    site: {
      siteMetadata: { title, siteUrl, description }
    }
  } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            siteUrl
            description
          }
        }
      }
    `
  );
  return { title, siteUrl, description };
};
