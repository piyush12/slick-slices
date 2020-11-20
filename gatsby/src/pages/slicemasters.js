import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: underline;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    text-align: center;
    margin-bottom: -2rem;
    z-index: 2;
    transform: rotate(-2deg);
    position: relative;
    font-size: 4rem;
  }
  .description {
    background: var(--yellow);
    position: relative;
    margin: 2rem;
    margin-top: -6rem;
    padding: 1rem;
    z-index: 2;
    transform: rotate(2deg);
    text-align: center;
  }
`;

const SliceMasterPage = ({ data, pageContext }) => {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => (
          <SlicemasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
};

export default SliceMasterPage;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
