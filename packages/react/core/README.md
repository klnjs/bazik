# @klnjs/core

A library that simplifies implemention of React components that support the `asChild` paradigm. Ensures full [TypeScript](https://www.typescriptlang.org/) support for component props, and refs.

## Installation

You can install the `@klnjs/core` package using your preferred package manager.

```bash
npm install @klnjs/core
```

## How to Use

```ts
import { poly, forwardRef, type CoreProps } from '@klnjs/core';

export type MyComponentProps = CoreProps<
  'div',
  {
    myCustomProp: string;
  }
>;

export const MyComponent = forwardRef<'div', MyComponentProps>(
  (props, forwardedRef) => <poly.div ref={forwardedRef} {...props} />
);

```
