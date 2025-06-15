import { useMemo, useState, useEffect } from 'react';

const useBrowserSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const memoizedSize = useMemo(() => size, [size]);

  return memoizedSize;
};

export default useBrowserSize;
