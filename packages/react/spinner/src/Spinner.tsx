import { poly, type PolyProps } from '@klnjs/core'
import { SpinnerProvider } from './SpinnerContext'
import { useSpinner, type UseSpinnerOptions } from './useSpinner'

export type SpinnerProps = PolyProps<'svg', UseSpinnerOptions>

export const Spinner = 
	({ width, size, ...otherProps }: SpinnerProps) => {
		const spinner = useSpinner({
			size,
			width
		})

		return (
			<SpinnerProvider value={spinner}>
				<poly.svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox={`0 0 ${spinner.diameter} ${spinner.diameter}`}
					width={spinner.diameter}
					height={spinner.diameter}
					{...otherProps}
				/>
			</SpinnerProvider>
		)
	}
