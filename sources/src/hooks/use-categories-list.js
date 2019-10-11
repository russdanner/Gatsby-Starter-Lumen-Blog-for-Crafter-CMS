// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useCategoriesList = () => {
  const { CrafterCMS } = useStaticQuery(
    graphql`
      query CategoriesListQuery {
        CrafterCMS { pages 
        #(
        #  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
        #) 
        {
        #  group(field: frontmatter___category) {
            #fieldValue
            totalCount: total
         # }
        }}
      }
    `
  );

  return CrafterCMS.group;
};

export default useCategoriesList;
