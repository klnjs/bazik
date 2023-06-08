import { forwardRef, type ElementType, type ReactElement } from 'react'
import { clsx } from 'clsx'
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef
} from '../utils/Component'
import * as classes from './Alert.css'

export type AlertPropsBase = {
	severity: 'info' | 'error' | 'warning' | 'success'
}

export type AlertProps<C extends ElementType> = PolymorphicComponentPropWithRef<
	C,
	AlertPropsBase
>

export type AlertComponent = <C extends ElementType = 'div'>(
	props: AlertProps<C>
) => ReactElement | null

export const Alert = forwardRef(function Alert<C extends ElementType = 'div'>(
	{
		as,
		severity = 'info',
		children,
		className: classNameProp,
		...otherProps
	}: AlertProps<C>,
	forwardedRef: PolymorphicRef<C>
) {
	const Component = as ?? 'div'
	const className = clsx(
		classNameProp,
		classes.alertRoot,
		classes.alertVariants[severity]
	)

	return (
		<Component
			ref={forwardedRef}
			role='alert'
			className={className}
			{...otherProps}
		>
			{children}
		</Component>
	)
})
