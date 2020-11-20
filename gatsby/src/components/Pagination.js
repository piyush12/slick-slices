import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginatioStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  & > * {
    padding: 1rem;
    flex: 1;
    text-decoration: none;
    border-right: 1px solid var(--grey);

    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  const arr = Array.from({ length: totalPages });
  console.log('totalPages', prevPage);

  return (
    <PaginatioStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {arr.map((_, i) => (
        <Link to={`${base}/${i + 1}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        &#8594; Next
      </Link>
    </PaginatioStyles>
  );
};

export default Pagination;
