import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { AlertProvider } from './AlertContext'
import { useAlert, type UseAlertOptions } from './useAlert'

export type AlertProps = AsChildComponentProps<'div', UseAlertOptions>

export const Alert = forwardRef<'div', AlertProps>((props, forwardedRef) => {
	const alert = useAlert(props)
	const mergedProps = mergeProps(props, alert.rootProps)

	return (
		<AlertProvider value={alert}>
			<freya.div ref={forwardedRef} {...mergedProps} />
		</AlertProvider>
	)
})
