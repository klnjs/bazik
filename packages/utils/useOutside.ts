import { MutableRefObject, useEffect } from 'react';

export type UseOutsideOptions = {
  enabled?: boolean;
  capture?: boolean;
  exclude?: HTMLElement;
};

export const useOutside = (
  ref: MutableRefObject<any>,
  type: keyof DocumentEventMap,
  handler: () => void,
  { enabled = true, capture = true, exclude }: UseOutsideOptions = {}
) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (ref.current && handler && enabled) {
      const element = ref.current;

      const listener = (event: any) => {
        const excluded = exclude && exclude.contains(event.target);
        const outside = !excluded && element && !element.contains(event.target);

        if (outside) {
          handler();
        }
      };

      document.addEventListener(type, listener, { capture });

      return () => {
        document.removeEventListener(type, listener, { capture });
      };
    }
  }, [ref, type, enabled, exclude, capture, handler]);
};
