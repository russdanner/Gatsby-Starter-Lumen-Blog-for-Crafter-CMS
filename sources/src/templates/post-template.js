// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { CrafterCMS } from '../types';

type Props = {
  data: {
    CrafterCMS: CrafterCMS
  }
};

const PostTemplate = ({ data }: Props) => {
  
  const post = data.CrafterCMS.pages.items[0];
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { title: postTitle, description: postDescription } = post;
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle;

  return (
    <Layout title={`${post.title_t} - ${siteTitle}`} description={metaDescription}>
      <Post post={post} />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($url: String!) {
    CrafterCMS {
      
      pages{
        items {
          localId(filter: { equals: $url }) 
          createdDate_dt
          ... on cms_page_post {
            title_t
            body_html_raw
          }
        }
      }
    }
  }
`;

export default PostTemplate;
