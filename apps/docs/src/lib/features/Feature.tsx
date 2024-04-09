import type { ComponentProps } from 'react'
import classes from './Features.module.css'

export type FeatureProps = ComponentProps<'li'>

export const Feature = ({ children, ...otherProps }: FeatureProps) => (
	<li className={classes.feature} {...otherProps}>
		<svg
			fill="currentColor"
			stroke="none"
			viewBox="0 0 24 24"
			className={classes.icon}
			aria-hidden={true}
		>
			<path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
		</svg>
		<p className={classes.description}>{children}</p>
	</li>
)
