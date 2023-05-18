import { ElementType } from 'react';
import clsx from 'clsx';

import { PolymorphicComponentProp } from '../utils/Component';

import * as classes from './ButtonBase.css';

export type ButtonBaseProps = {
  type?: 'button' | 'submit' | 'reset';
};

export const ButtonBase = <C extends ElementType = 'button'>({
  as,
  type = 'button',
  children,
  className: classNameProp,
  onClick,
  ...otherProps
}: PolymorphicComponentProp<C, ButtonBaseProps>) => {
  const Component = as ?? 'button';
  const className = clsx(classNameProp, classes.buttonBaseRoot);

  return (
    <Component
      type={type}
      className={className}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
