import { ReactNode, Children, isValidElement } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
  target?: string;
  disabled?: boolean;
  children: ReactNode;
};

export const Portal = ({
  target = 'portal-root',
  disabled,
  children,
}: PortalProps): JSX.Element | null => {
  const parent = getContainer(target);
  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('Portal children is not valid react element');
  }

  if (!parent) {
    return null;
  }

  return disabled ? child : createPortal(child, parent);
};

const getContainer = (target: string) => {
  let container = document.getElementById(target);

  if (target === 'portal-root' && container === null) {
    container = document.createElement('div');
    container.setAttribute('id', target);
    document.body.appendChild(container);
  }

  return container;
};
