import { vars } from './contract.css';

export const helpers = {
  radius: (...input: Array<number>) =>
    input.map((value) => `calc(${vars.radius[1]} * ${value})`).join(' '),
  spacing: (...input: Array<number>) =>
    input.map((value) => `calc(${vars.spacing[1]} * ${value})`).join(' '),
  transition: (...input: Array<string>) =>
    input
      .map(
        (value) =>
          `${value} ${vars.transition.duration} ${vars.transition.easing}`
      )
      .join(', '),
};
