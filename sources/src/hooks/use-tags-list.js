// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useTagsList = () => {
  const { CrafterCMS } = useStaticQuery(
    graphql`
      query TagsListQuery {
        CrafterCMS
        #(
        #  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
        #) 
        { pages {
        #  group(field: frontmatter___tags) {
          #  fieldValue
            totalCount: total
         # }
          }
        }
      }
    `
  );

  return CrafterCMS.group;
};

export default useTagsList;
