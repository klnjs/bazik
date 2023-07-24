import { freya, forwardRef, type CoreProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { useAlertContext } from './AlertContext'

export type AlertTitleProps = CoreProps<'div'>

export const AlertTitle = forwardRef<'div', AlertTitleProps>(
	(props, forwardedRef) => {
		const { titleProps } = useAlertContext()
		const mergedProps = mergeProps(props, titleProps)

		return <freya.div ref={forwardedRef} {...mergedProps} />
	}
)
