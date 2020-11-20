import React from 'react';
import { graphql } from 'gatsby';
import Pizzalist from '../components/Pizzalist';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <ToppingsFilter />
      <Pizzalist pizzas={pizzas} />
    </>
  );
};

export default PizzasPage;

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
