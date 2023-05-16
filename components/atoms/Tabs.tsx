import styled from '@emotion/styled';

const Tabs = styled.nav`
  display: flex;
  margin-bottom: 1rem;
  > * {
    padding: 0.5rem 2rem;
  }
  .active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export default Tabs;
