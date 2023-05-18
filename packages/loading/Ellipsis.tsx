import { CSSProperties } from 'react';

export type EllipsisProps = {
  gap?: number;
  count?: number;
  radius?: number;
  duration?: number;
  style?: CSSProperties;
  className?: string;
  [key: `data-${string}`]: string;
};

export const Ellipsis = ({
  count = 3,
  radius = 3,
  gap = radius * 2,
  duration = 1,
  ...otherProps
}: EllipsisProps) => {
  const diameter = radius * 2;
  const width = diameter * count + gap * (count - 1);
  const dots = Array.from({ length: count }, (x, i) => i);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${diameter}`}
      width={width}
      height={diameter}
      fill="currentColor"
      {...otherProps}
    >
      {dots.map((index) => (
        <EllipsisCircle
          key={index}
          r={radius}
          cx={radius + index * (diameter + gap)}
          delay={0.1 * (index + 1)}
          duration={duration}
        />
      ))}
    </svg>
  );
};

export const EllipsisCircle = ({
  r,
  cx,
  delay,
  duration,
}: {
  r: number;
  cx: number;
  delay: number;
  duration: number;
}) => (
  <circle cx={cx} cy={r} r={r} opacity={1}>
    <animate
      attributeName="r"
      dur={`${duration}s`}
      values={`${r / 2};${r};${r / 2}`}
      repeatCount="indefinite"
      begin={`${delay}s`}
    />
    <animate
      attributeName="opacity"
      dur={`${duration}s`}
      values="0.2;1;0.2"
      repeatCount="indefinite"
      begin={`${delay}s`}
    />
  </circle>
);
