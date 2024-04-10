import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { SpinnerProvider } from './SpinnerContext'
import { useSpinner, type UseSpinnerOptions } from './useSpinner'

export type SpinnerProps = CoreProps<'svg', UseSpinnerOptions>

export const Spinner = forwardRef<'svg', SpinnerProps>(
	({ width, size, ...otherProps }, forwardedRef) => {
		const spinner = useSpinner({
			size,
			width
		})

		return (
			<SpinnerProvider value={spinner}>
				<poly.svg
					ref={forwardedRef}
					xmlns="http://www.w3.org/2000/svg"
					viewBox={`0 0 ${spinner.diameter} ${spinner.diameter}`}
					width={spinner.diameter}
					height={spinner.diameter}
					{...otherProps}
				/>
			</SpinnerProvider>
		)
	}
)
