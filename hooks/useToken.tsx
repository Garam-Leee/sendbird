import { useState, useEffect, useCallback } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';

export default function useToken() {
  const [hasToken, setHasToken] = useState(false);
  const setToken = useCallback((token: string) => {
    if (!token) return;
    const { exp } = jwtDecode<{ exp: number }>(token);
    setCookie('token', token, {
      // domain: process.env.NEXT_PUBLIC_DOMAIN,
      sameSite: 'none',
      secure: true,
      expires: new Date(exp * 1000),
    });
    setHasToken(true);
  }, []);
  useEffect(() => {
    const token = getCookie('token', {
      // domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
    if (token) setHasToken(true);
  }, []);
  return {
    token: getCookie('token', {
      // domain: process.env.NEXT_PUBLIC_DOMAIN,
    }),
    hasToken,
    setToken,
  };
}
