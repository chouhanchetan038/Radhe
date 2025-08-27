import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return null; // No UI rendered
};

export default ScrollToTop;
