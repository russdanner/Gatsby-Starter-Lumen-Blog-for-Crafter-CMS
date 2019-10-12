// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import type { CrafterCMS } from '../types';

type Props = {
  data: {
    CrafterCMS: CrafterCMS
  }
};

const PageTemplate = ({ data }: Props) => {
  const post = data.CrafterCMS.pages.items[0];
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { title: pageTitle, description: pageDescription } = post;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <Layout title={`${post.title_t} - ${siteTitle}`} description={metaDescription}>
      <Sidebar />
      <Page title={post.title_t}>
        <div dangerouslySetInnerHTML={{ __html: post.body_html }}  
            data-studio-component-path={post.cmsId} 
            data-studio-ice-path={post.cmsId}
            data-studio-component={post.cmsType}
            data-studio-ice=""/>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageBySlug($url: String!) {
     CrafterCMS { 
      pages {
        items {
          localId(filter: { equals: $url})
          createdDate_dt
          cmsId: localId
          cmsType: content__type
          ... on  cms_page_page {
            body_html
            title_t
          }
        }
      }
    }
  }
`;

export default PageTemplate;
