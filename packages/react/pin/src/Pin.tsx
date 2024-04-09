import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { PinProvider } from './PinContext'
import { usePin, type UsePinOptions } from './usePin'

export type PinProps = CoreProps<'div', UsePinOptions>

export const Pin = forwardRef<'div', PinProps>(
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
		const pin = usePin({
			defaultValue,
			disabled,
			length,
			conceal,
			type,
			value,
			onChange
		})

		return (
			<PinProvider value={pin}>
				<poly.div ref={forwardedRef} {...otherProps} />
			</PinProvider>
		)
	}
)
