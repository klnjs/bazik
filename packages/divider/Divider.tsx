import { cloneElement, isValidElement, ReactElement } from 'react';
import clsx from 'clsx';

import * as classes from './Divider.css';

export type DividerProps = {
  children?: ReactElement<{ className?: string }>;
};

export const Divider = ({ children }: DividerProps) => (
  <div className={classes.dividerRoot}>
    <hr className={classes.dividerRule} />
    {isValidElement(children)
      ? cloneElement(children, {
          className: clsx(children.props.className, classes.dividerText),
        })
      : null}
  </div>
);
