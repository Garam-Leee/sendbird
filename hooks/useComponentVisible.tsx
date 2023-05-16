import { useState, useEffect, useRef, useCallback } from 'react';

export default function useComponentVisible(initialIsVisible: boolean) {
  const ref = useRef<HTMLElement>(null);
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (ref.current && !ref.current.contains(target)) {
      setIsComponentVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);
  return { ref, isComponentVisible, setIsComponentVisible };
}
