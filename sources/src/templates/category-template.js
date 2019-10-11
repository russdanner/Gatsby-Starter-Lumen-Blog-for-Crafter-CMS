// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { PageContext, CrafterCMS } from '../types';

type Props = {
  data: CrafterCMS,
  pageContext: PageContext
};

const CategoryTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const {
    category,
    currentPage,
    prevPagePath,
    nextPagePath,
    hasPrevPage,
    hasNextPage,
  } = pageContext;

  const { edges } = data.CrafterCMS;
  const pageTitle = currentPage > 0 ? `${category} - Page ${currentPage} - ${siteTitle}` : `${category} - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar />
      <Page title={category}>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query CategoryPage($category: String) {
    CrafterCMS {
      edges: pages {
        node: items {
          createdDate_dt
          content__type(filter: {equals:"/page/post"})
          url: localId(transform: "storeUrlToRenderUrl")

          ... on cms_page_post {
              body_html
              body_html_raw
              title_t
              category_s (filter: { equals: $category })
              description_t
            }
        }
      }
    }
  }
`;

export default CategoryTemplate;
