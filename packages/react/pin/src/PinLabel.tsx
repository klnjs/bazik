import { poly, forwardRef, useId, type CoreProps } from '@klnjs/core'
import { usePinContext } from './PinContext'

export type PinLabelProps = CoreProps<'label'>

export const PinLabel = forwardRef<'label', PinLabelProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const id = useId(idProp)
		const { inputId } = usePinContext()

		return (
			<poly.label
				id={id}
				ref={forwardedRef}
				htmlFor={inputId}
				{...otherProps}
			/>
		)
	}
)
