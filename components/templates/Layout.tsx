import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { H3 } from '@/components/atoms/Text';
import { useRouter } from 'next/router';

interface IProps {
  children: React.ReactNode;
}

const StyledGroupLink = styled(H3)`
  padding-bottom: 5px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 5px;
`;

const StyledNav = styled.nav`
  margin-right: 40px;
  padding-left: 5px;
  flex: 0 0 226px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  ul {
    display: flex;
    flex-direction: column;
  }
  & > ul {
    position: sticky;
    top: 0;
    padding-top: 30px;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
`;

export default function Layout({ children }: IProps) {
  const router = useRouter();
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    if (!router.isReady) return;
    setReady(true);
  }, [router.query, router.isReady]);
  return (
    <>
      {isReady &&
        (router.query.type === 'popup' ? (
          children && children
        ) : (
          <Container>
            <StyledNav>
              <ul>
                <li>
                  <StyledGroupLink>포인트</StyledGroupLink>
                  <ul>
                    <li>
                      <StyledLink href="/points/catalog/rewards">
                        적립처/사용처 관리
                      </StyledLink>
                    </li>
                    <li>
                      <StyledLink href="/points/histories">
                        적립/사용 내역
                      </StyledLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </StyledNav>
            {children && children}
          </Container>
        ))}
      {!isReady && <div />}
    </>
  );
}
