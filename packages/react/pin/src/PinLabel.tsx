import {
	poly,
	forwardRef,
	useId,
	asDataProp,
	type CoreProps
} from '@klnjs/core'
import { usePinContext } from './PinContext'

export type PinLabelProps = CoreProps<'label'>

export const PinLabel = forwardRef<'label', PinLabelProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const id = useId(idProp)
		const { disabled, inputId } = usePinContext()

		return (
			<poly.label
				id={id}
				ref={forwardedRef}
				htmlFor={inputId}
				data-disabled={asDataProp(disabled)}
				{...otherProps}
			/>
		)
	}
)
