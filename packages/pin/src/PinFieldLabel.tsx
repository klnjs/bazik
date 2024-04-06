import { useId, freya, forwardRef, type CoreProps } from '@klnjs/core'
import { usePinFieldContext } from './PinFieldContext'

export type PinFieldLabelProps = CoreProps<'label'>

export const PinFieldLabel = forwardRef<'label', PinFieldLabelProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const id = useId(idProp)
		const { inputId } = usePinFieldContext()

		return (
			<freya.label
				id={id}
				ref={forwardedRef}
				htmlFor={inputId}
				{...otherProps}
			/>
		)
	}
)
