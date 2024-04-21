import React from 'react'
import classes from './Highlight.module.css'

export type HighlightProps = {
	children: string
}

export const Highlight = ({ children }: HighlightProps) => (
	<span className={classes.highlight}>{children}</span>
)
