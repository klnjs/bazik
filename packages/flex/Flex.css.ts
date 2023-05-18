import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { vars } from '../theme/contract.css';
import { globals } from '../theme/globals.css';

export const flexSprinkles = createSprinkles(
  defineProperties({
    properties: {
      display: ['flex', 'inline-flex'],
      flexGrow: [1, 2, 3, 4],
      flexShrink: [1, 2, 3, 4],
      flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
      flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
      alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
      justifyContent: [
        'stretch',
        'flex-start',
        'center',
        'flex-end',
        'space-around',
        'space-between',
      ],
      gap: {
        ...globals,
        ...vars.spacing,
      },
    } as const,
  })
);
