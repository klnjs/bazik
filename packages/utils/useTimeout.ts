import { useEffect, useRef } from 'react';

export type UseTimeoutOptions = {
  enabled?: boolean;
  delay?: number;
};

export const useTimeout = (
  callback: () => void,
  { enabled = true, delay = 0 }: UseTimeoutOptions = {}
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const id = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [enabled, delay]);
};
