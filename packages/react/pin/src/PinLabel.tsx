import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { usePinContext } from './PinContext'

export type PinLabelProps = CoreProps<'label'>

export const PinLabel = forwardRef<'label', PinLabelProps>(
	(props, forwardedRef) => {
		const { inputId } = usePinContext()

		return <poly.label ref={forwardedRef} htmlFor={inputId} {...props} />
	}
)
