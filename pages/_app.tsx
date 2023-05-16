import '@/styles/reset.css';
import '@/styles/fonts.css';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@emotion/react';
import Head from 'next/head';

import theme from '@/styles/theme';
import useToken from '@/hooks/useToken';

import Layout from '@/components/templates/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setToken, hasToken } = useToken();

  useEffect(() => {
    const { token } = router.query;
    if (!token || typeof token !== 'string' || typeof setToken !== 'function') {
      return;
    }
    setToken(token);
  }, [router.query, setToken]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>올라케어 운영</title>
      </Head>
      <Layout>
        {hasToken && <Component {...pageProps} />}
        {!hasToken && <div>로그인이 필요합니다.</div>}
      </Layout>
    </ThemeProvider>
  );
}
