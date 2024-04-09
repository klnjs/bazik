import React from 'react'
import clsx from 'clsx'
import classes from './Highlight.module.css'

export type HighlightProps = {
	children: string
}

export const Highlight = ({ children }) => {
	return <span className={classes.highlight}>{children}</span>
}
