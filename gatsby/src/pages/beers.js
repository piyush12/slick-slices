import React from 'react';
import { graphql } from 'gatsby';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: black;
  }
`;

const BeersPage = ({ data }) => (
  <>
    <h2>We have {data.beers.nodes.length} Beers Available. Dine in Only!</h2>
    <BeerGridStyles>
      {data.beers.nodes.map((beer, i) => {
        const rating = Math.round(beer.rating.average);
        const ratingArray = new Array(rating).fill(null);
        const blankRatingArray = new Array(5 - rating).fill(null);

        return (
          <SingleBeerStyles key={i}>
            <img src={beer.image} alt={beer.name} />
            <h3>{beer.name}</h3>
            {beer.price}
            <p>
              {ratingArray.map(() => (
                <AiFillStar style={{ color: 'orange' }} />
              ))}
              {blankRatingArray.map(() => (
                <AiOutlineStar style={{ color: 'orange' }} />
              ))}
              <span>({beer.rating.reviews})</span>
            </p>
          </SingleBeerStyles>
        );
      })}
    </BeerGridStyles>
  </>
);

export default BeersPage;

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        image
        name
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
