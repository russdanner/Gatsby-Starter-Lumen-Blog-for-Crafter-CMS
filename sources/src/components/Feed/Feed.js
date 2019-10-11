// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.node.map((node) => (
      <div className={styles['feed__item']} key={node.category_s}>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(node.createdDate_dt).format('MMMM D, YYYY')}>
            {moment(Date.parse(node.createdDate_dt.split("T")[0])).format('MMMM YYYY')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <Link to={"/category/"+node.category_s} className={styles['feed__item-meta-category-link']}>{node.category_s}</Link>
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} to={node.url}>{node.title_t}</Link>
        </h2>
        <p className={styles['feed__item-description']}>{node.description_t}</p>
        <Link className={styles['feed__item-readmore']} to={node.url}>Read</Link>
      </div>
    ))}
  </div>
);

export default Feed;
