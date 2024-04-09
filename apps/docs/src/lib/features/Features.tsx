import type { ComponentProps } from 'react'
import classes from './Features.module.css'

export type FeaturesProps = ComponentProps<'div'>

export const Features = ({ children, ...otherProps }: FeaturesProps) => (
	<div className={classes.features} {...otherProps}>
		<ul className={classes.list}>{children}</ul>
	</div>
)
