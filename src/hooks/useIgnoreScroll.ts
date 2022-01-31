import { useEffect } from 'react';

export function useIgnoreScroll() {
  useEffect(() => {
    function preventDefault(event: Event) {
      event.preventDefault();
    }
    document.addEventListener('mousewheel', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('mousewheel', preventDefault);
    };
  });
}
