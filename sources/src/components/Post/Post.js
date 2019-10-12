// @flow
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};

const Post = ({ post }: Props) => {
  const { body_html_raw } = post;
  const { tagSlugs_s, slug_s } = post;
  const { tags, title_t, createdDate } = post;

  return (
    <div className={styles['post']}             
            data-studio-component-path={post.cmsId} 
            data-studio-ice-path={post.cmsId}
            data-studio-component={post.cmsType}
            data-studio-ice="" >
      <Link className={styles['post__home-button']} to="/">All Articles</Link>

      <div className={styles['post__content']}>
        <Content body={body_html_raw} title={title_t} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={createdDate} />
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug_s} postTitle={post.title_t} />
      </div>
    </div>
  );
};

export default Post;
