import { useMemo } from 'react';
import styled from '@emotion/styled';

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationItem = styled.li`
  flex-basis: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.inactive};

  .active {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
  button {
    width: 100%;
    :disabled {
      font-weight: 300;
      color: ${({ theme }) => theme.colors.disabled};
      cursor: not-allowed;
    }
  }
`;
const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
`;
const Container = styled.nav``;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IProps) {
  const pageNumbers = useMemo(() => {
    const theArray = [];
    const startIndex = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endIndex = startIndex + 10 > totalPages ? totalPages : startIndex + 9;
    for (let i = startIndex; i <= endIndex; i++) {
      theArray.push(i);
    }
    return theArray;
  }, [currentPage, totalPages]);

  return (
    <Container>
      <PaginationList>
        <PaginationItem>
          <button
            disabled={totalPages === 0 || pageNumbers[0] === 1}
            onClick={() => onPageChange(pageNumbers[0] - 1)}
          >
            {'<<'}{' '}
          </button>
        </PaginationItem>
        <PaginationItem>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {'<'}{' '}
          </button>
        </PaginationItem>
        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <button
              className={`${currentPage === page ? ' active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <button
            disabled={totalPages === 0 || currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            {'>'}
          </button>
        </PaginationItem>
        <PaginationItem>
          <button
            disabled={
              totalPages === 0 ||
              pageNumbers[pageNumbers.length - 1] === totalPages
            }
            onClick={() =>
              onPageChange(pageNumbers[pageNumbers.length - 1] + 1)
            }
          >
            {'>>'}{' '}
          </button>
        </PaginationItem>
      </PaginationList>
    </Container>
  );
}
