import { RadioBase } from '../radio/RadioBase';

export type AccordionRadioProps = {
  expanded: boolean;
  className?: string;
};

export const AccordionRadio = ({
  expanded,
  className,
}: AccordionRadioProps) => (
  <RadioBase
    checked={expanded}
    readOnly
    tabIndex={-1}
    role="presentation"
    className={className}
    {...{ inert: '' }}
  />
);
