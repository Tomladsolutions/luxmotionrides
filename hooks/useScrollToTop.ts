import { useEffect } from 'react';

/**
 * Scrolls the window to the top once, when the component mounts.
 * Useful for route-level components so navigation always starts at the top.
 */
export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
