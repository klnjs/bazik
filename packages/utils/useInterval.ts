import { useEffect, useRef } from 'react';

export type UseIntervalOptions = {
  enabled?: boolean;
  interval?: number;
  delay?: number | Date;
};

export const useInterval = (
  callback: () => void,
  { enabled = true, delay = 0, interval = 100 }: UseIntervalOptions = {}
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const start = getStart(delay);
    const id = setInterval(() => {
      if (start < new Date()) {
        savedCallback.current();
      }
    }, interval);

    return () => {
      clearInterval(id);
    };
  }, [enabled, delay, interval]);
};

const getStart = (delay: number | Date) => {
  if (delay instanceof Date) {
    return delay;
  }

  return new Date(delay + Date.now());
};
