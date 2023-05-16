import styled from '@emotion/styled';
import { css } from '@emotion/react';

const base = css`
  font-weight: 400;
  line-height: 1.2;
`;

export const H1 = styled.h1`
  ${base}
  font-size: 32px;
`;
export const H2 = styled.h2`
  ${base}
  font-size: 22px;
`;
export const H3 = styled.h3`
  ${base}
  font-size: 20px;
`;
export const H4 = styled.h4`
  ${base}
  font-size: 18px;
`;

export const P1 = styled.p`
  ${base}
  font-size: 16px;
`;
export const P2 = styled.p`
  ${base}
  font-size: 15px;
`;
export const P3 = styled.p`
  ${base}
  font-size: 13px;
`;
export const P4 = styled.p`
  ${base}
  font-size: 11px;
`;

export default {
  H1,
  H2,
  H3,
  H4,
  P1,
  P2,
  P3,
  P4,
};
