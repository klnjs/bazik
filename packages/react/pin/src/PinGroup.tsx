import { poly, type PolyProps } from '@klnjs/core'

export type PinGroupProps = PolyProps<'div'>

export const PinGroup = (props: PinGroupProps) => <poly.div {...props} />
