import clsx from 'clsx'
import { type PolymorphicComponentProp } from '../utils/Component'
import { ButtonBase, type ButtonBaseProps } from './ButtonBase'
import * as classes from './Button.css'

export type ButtonProps = ButtonBaseProps & {
	color?: keyof typeof classes.buttonVariants
}

export const Button = ({
	type = 'button',
	color = 'primary',
	disabled,
	children,
	className: classNameProp,
	'aria-disabled': ariaDisabled,
	onClick,
	...otherProps
}: PolymorphicComponentProp<'button', ButtonProps>) => {
	const className = clsx(
		classNameProp,
		classes.buttonRoot,
		classes.buttonVariants[color],
		{
			disabled: disabled ?? ariaDisabled
		}
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
