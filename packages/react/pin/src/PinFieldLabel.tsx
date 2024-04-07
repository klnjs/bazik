import { poly, forwardRef, useId, type CoreProps } from '@klnjs/core'
import { usePinFieldContext } from './PinFieldContext'

export type PinFieldLabelProps = CoreProps<'label'>

export const PinFieldLabel = forwardRef<'label', PinFieldLabelProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const id = useId(idProp)
		const { inputId } = usePinFieldContext()

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
