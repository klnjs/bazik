import clsx from 'clsx';

import * as classes from './Icon.css';

export type IconProps = {
  title?: string;
  description?: string;
  viewBox?: string;
  path: string;
  size?: Parameters<typeof classes.iconSprinkles>[0]['width'];
  color?: Parameters<typeof classes.iconSprinkles>[0]['color'];
  rotate?: Parameters<typeof classes.iconSprinkles>[0]['transform'];
  className?: string;
};

export const Icon = ({
  title,
  description,
  size = 3,
  path,
  color,
  rotate,
  viewBox = '0 0 24 24',
  className: classNameProp,
  ...otherProps
}: IconProps) => {
  const className = clsx(
    classNameProp,
    classes.iconRoot,
    classes.iconSprinkles({
      color,
      width: size,
      height: size,
      transform: rotate,
    })
  );

  return (
    <svg
      focusable={false}
      viewBox={viewBox}
      role="presentation"
      aria-hidden
      className={className}
      {...otherProps}
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      {path && <path d={path} />}
    </svg>
  );
};
