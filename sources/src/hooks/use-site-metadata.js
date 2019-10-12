// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const site  = useStaticQuery(
    graphql`
query SiteMetaData {
  CrafterCMS {    
    site: component_level__descriptor {
      siteMetadata: items {        
        blogDescription_html        
        blogImage_s        
        blogTitle_s      
      }    
    }  
  }          
}
    `
  );

var siteMetadata = site.CrafterCMS.site.siteMetadata[0];

siteMetadata.title = siteMetadata.blogTitle_s;
siteMetadata.subtitle = 'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.';
siteMetadata.copyright = '© All rights reserved.';
siteMetadata.disqusShortname = '';
siteMetadata.postsPerPage = 4;

siteMetadata.menu = [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Contact me',
      path: '/pages/contacts'
    }]
siteMetadata.author = { 
    contacts: {}, 
    name: siteMetadata.blogTitle_s,
    photo: siteMetadata.blogImage_s,
    bio: siteMetadata.blogDescription_html,
}

  return siteMetadata;
};

export default useSiteMetadata;
