import { forwardRef, type ReactNode, type ElementType } from 'react'
import { clsx } from 'clsx'
import {
	createComponent,
	type PolymorphicComponentPropWithRef,
	type PolymorphicRef
} from '../utils/Component'
import * as classes from './Alert.css'

export type AlertProps<C extends ElementType> = PolymorphicComponentPropWithRef<
	C,
	{
		severity: 'info' | 'error' | 'warning' | 'success'
	}
>

export type AlertComponent = <C extends ElementType = 'div'>(
	props: AlertProps<C>
) => ReactNode

export const Alert: AlertComponent = createComponent(
	'Alert',
	forwardRef(
		<C extends ElementType = 'div'>(
			{
				as,
				severity = 'info',
				children,
				className: classNameProp,
				...otherProps
			}: AlertProps<C>,
			forwardedRef: PolymorphicRef<C>
		) => {
			const Component = as ?? 'div'
			const className = clsx(
				classNameProp,
				classes.sprinkles({
					radius: 2,
					padding: 1,
					palette: severity
				})
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
		}
	)
)
