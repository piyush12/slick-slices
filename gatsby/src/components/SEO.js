import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const SEO = ({ children, location, description, title, image }) => {
  const site = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  console.log('site', site);
  return (
    <Helmet titleTemplate={`%s ${site.site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
      />
      <meta name="description" content={site.site.siteMetadata.description} />

      {children}
    </Helmet>
  );
};

export default SEO;
