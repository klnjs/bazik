import { useState, useLayoutEffect, RefObject } from 'react';

export type UseAccordionPanelAnimationOptions = {
  expanded: boolean;
  onExpanded?: () => void;
  onCollapsed?: () => void;
};

export const useAccordionPanelAnimation = <E extends HTMLElement>(
  ref: RefObject<E>,
  { expanded, onExpanded, onCollapsed }: UseAccordionPanelAnimationOptions
) => {
  const [height, setHeight] = useState(expanded ? 'auto' : '0');
  const [overflow, setOverflow] = useState(expanded ? 'visible' : 'hidden');

  useLayoutEffect(() => {
    const content = ref.current;

    if (content) {
      const contentFrom = `${content.offsetHeight}px`;
      const contentExpanded = `${content.scrollHeight}px`;
      const contentCollapsed = '0px';
      const contentTarget = expanded ? contentExpanded : contentCollapsed;
      const contentAnimation = content.animate(
        [
          {
            height: contentFrom,
          },
          {
            height: contentTarget,
          },
        ],
        {
          fill: 'forwards',
          easing: 'ease',
          duration: 400,
          iterations: 1,
        }
      );

      setHeight(contentFrom);
      setOverflow('hidden');

      contentAnimation.addEventListener('finish', () => {
        setHeight(expanded ? 'auto' : '0');
        setOverflow(expanded ? 'visible' : 'hidden');

        if (expanded && onExpanded) {
          onExpanded();
        }

        if (!expanded && onCollapsed) {
          onCollapsed();
        }
      });
    }
  }, [ref, expanded, onExpanded, onCollapsed]);

  return {
    height,
    overflow,
  };
};
