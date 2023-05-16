import styled from '@emotion/styled';

export const Cell = styled.td<{ center?: boolean }>`
  padding: 5px;
  ${({ center }) => center && 'text-align: center; vertical-align: middle'};
`;
export const Row = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
export const Header = styled.thead`
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  tr {
    border-bottom-width: 3px;
    border-bottom-style: double;
  }
`;
export const Body = styled.tbody``;
export const Table = styled.table`
  width: 100%;
`;

export default {
  Cell,
  Row,
  Header,
  Body,
  Table,
};
