import clsx from 'clsx'
import * as classes from './Icon.css'

export type IconSprinkles = Parameters<typeof classes.iconSprinkles>[0]

export type IconProps = IconSprinkles & {
	title?: string
	description?: string
	viewBox?: string
	path: string
	className?: string
}

export const Icon = ({
	title,
	description,
	size = 3,
	path,
	color,
	rotate,
	viewBox = '0 0 24 24',
	className: classNameProp,
	...otherProps
}: IconProps) => {
	const className = clsx(
		classNameProp,
		classes.iconRoot,
		classes.iconSprinkles({
			size,
			color,
			rotate
		})
	)

	return (
		<svg
			focusable={false}
			viewBox={viewBox}
			role='presentation'
			aria-hidden
			className={className}
			{...otherProps}
		>
			{title ? <title>{title}</title> : null}
			{description ? <desc>{description}</desc> : null}
			{path ? <path d={path} /> : null}
		</svg>
	)
}
