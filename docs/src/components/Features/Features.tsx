import type { ComponentProps } from 'react'
import classes from './Features.module.css'

export type FeaturesProps = ComponentProps<'div'>

export const Features = ({ children, ...otherProps }: FeaturesProps) => (
	<div className={classes.features} {...otherProps}>
		<h2>Features</h2>
		<ul className={classes['features-list']}>{children}</ul>
	</div>
)
