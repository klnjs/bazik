import { freya, forwardRef, type CoreProps } from '../core'
import { PinFieldProvider } from './PinFieldContext'
import { usePinField, type UsePinFieldOptions } from './usePinField'

export type PinFieldProps = CoreProps<'div', UsePinFieldOptions>

export const PinField = forwardRef<'div', PinFieldProps>(
	(
		{
			defaultValue,
			disabled,
			length,
			secret,
			type,
			value,
			onChange,
			...otherProps
		},
		forwardedRef
	) => {
		const pinfield = usePinField({
			defaultValue,
			disabled,
			length,
			secret,
			type,
			value,
			onChange
		})

		return (
			<PinFieldProvider value={pinfield}>
				<freya.div ref={forwardedRef} {...otherProps} />
			</PinFieldProvider>
		)
	}
)
