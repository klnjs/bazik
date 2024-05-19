import { poly, useId, type PolyProps } from '@klnjs/core'
import { usePinContext } from './PinContext'

export type PinLabelProps = PolyProps<'label'>

export const PinLabel = ({ id: idProp, ...otherProps }: PinLabelProps) => {
	const id = useId(idProp)
	const { inputId } = usePinContext()

	return (
		<poly.label
			id={id}
			htmlFor={inputId}
			{...otherProps}
		/>
	)
}
