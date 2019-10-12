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

const IndexTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;


  const { edges } = data.CrafterCMS;
  const pageTitle = currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar isIndex />
      <Page>
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
#  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
query IndexTemplate {
  CrafterCMS {
    edges: pages {
      node: items {
        createdDate_dt
        cmsId: localId
        cmsType: content__type
        content__type(filter: {equals: "/page/post"})
        url: localId(transform: "storeUrlToRenderUrl")
        ... on cms_page_post {
          body_html
          body_html_raw
          title_t
          category_s
          description_t
        }
      }
    }
  }
}
`;

export default IndexTemplate;
