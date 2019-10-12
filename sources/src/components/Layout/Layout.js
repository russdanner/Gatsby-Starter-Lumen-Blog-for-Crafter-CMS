// @flow
import React from 'react';
import Helmet from 'react-helmet';
import type { Node as ReactNode } from 'react';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  description?: string
};

const Layout = ({ children, title, description }: Props) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
       <script src="http://localhost:8080/studio/static-assets/libs/requirejs/require.js" data-main="http://localhost:8080/studio/overlayhook?site=NOTUSED&page=NOTUSED&cs.js"></script>
    <script>document.domain = "localhost"; </script>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
    </Helmet>
    {children}
   
  </div>
);

export default Layout;
