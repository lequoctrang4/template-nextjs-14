import { useRef, useState, useEffect } from 'react';

// Custom hook to get the left offset of a sidebar element
export function useElementOffset() {
  const [elementWidth, setElementWidth] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateOffset = () => {
      if (elementRef.current) {
        setElementWidth(elementRef.current.offsetWidth);
        setElementHeight(elementRef.current.offsetHeight);
      }
    };

    // Initial calculation
    updateOffset();

    // Recalculate when the window is resized
    window.addEventListener('resize', updateOffset);

    // Cleanup the event listener when component unmounts or rerenders
    return () => {
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return { elementWidth, elementHeight, elementRef };
}
