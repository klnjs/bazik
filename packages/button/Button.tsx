import clsx from 'clsx'
import type { PolymorphicComponentProp } from '../utils/Component'
import { ButtonBase, type ButtonBaseProps } from './ButtonBase'
import * as classes from './Button.css'

export type ButtonProps = ButtonBaseProps & {
	variant?: 'contained' | 'outlined' | 'text'
	color?: keyof typeof classes.buttonVariants
}

export const Button = ({
	type = 'button',
	color = 'primary',
	variant = 'contained',
	disabled,
	children,
	className: classNameProp,
	onClick,
	...otherProps
}: PolymorphicComponentProp<'button', ButtonProps>) => {
	const className = clsx(
		classNameProp,
		classes.buttonRoot,
		classes.buttonVariants[color]
	)

	return (
		<ButtonBase
			type={type}
			className={className}
			onClick={onClick}
			{...otherProps}
		>
			{children}
		</ButtonBase>
	)
}
