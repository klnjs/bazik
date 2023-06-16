import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { useAlertContext } from './AlertContext'

export type AlertContentProps = AsChildComponentProps<'div'>

export const AlertContent = forwardRef<'div', AlertContentProps>(
	(props, forwardedRef) => {
		const { contentProps } = useAlertContext()
		const mergedProps = mergeProps(props, contentProps)

		return <freya.div ref={forwardedRef} {...mergedProps} />
	}
)
