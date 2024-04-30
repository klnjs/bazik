import { poly, type PolyProps } from '@klnjs/core'

export type IconPathProps = PolyProps<'path'>

export const IconPath = (props: IconPathProps) => (
	<poly.path  {...props} />
)
