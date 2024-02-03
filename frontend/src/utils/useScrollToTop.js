import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop(flag = true) {
  const location = useLocation();

  useEffect(() => {
    if (flag) { window.scrollTo(0, 0) }
  }, [location]);
}