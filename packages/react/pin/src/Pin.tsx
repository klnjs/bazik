import { poly, type PolyProps } from '@klnjs/core'
import { PinProvider } from './PinContext'
import { usePin, type UsePinOptions } from './usePin'

export type PinProps = PolyProps<'div', UsePinOptions>

export const Pin = 
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
		}: PinProps
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
				<poly.div  {...otherProps} />
			</PinProvider>
		)
	}
