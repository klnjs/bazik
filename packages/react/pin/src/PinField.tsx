import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { PinFieldProvider } from './PinFieldContext'
import { usePinField, type UsePinFieldOptions } from './usePinField'

export type PinFieldProps = CoreProps<'div', UsePinFieldOptions>

export const PinField = forwardRef<'div', PinFieldProps>(
	(
		{
			defaultValue,
			disabled,
			length,
			conceal,
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
			conceal,
			type,
			value,
			onChange
		})

		return (
			<PinFieldProvider value={pinfield}>
				<poly.div ref={forwardedRef} {...otherProps} />
			</PinFieldProvider>
		)
	}
)
