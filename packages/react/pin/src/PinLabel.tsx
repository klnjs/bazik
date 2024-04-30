import { poly, useId, toData, type PolyProps } from '@klnjs/core'
import { usePinContext } from './PinContext'

export type PinLabelProps = PolyProps<'label'>

export const PinLabel = 
	({ id: idProp, ...otherProps }: PinLabelProps) => {
		const id = useId(idProp)
		const { disabled, inputId } = usePinContext()

		return (
			<poly.label
				id={id}
				htmlFor={inputId}
				data-disabled={toData(disabled)}
				{...otherProps}
			/>
		)
	}
