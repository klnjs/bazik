import { ComponentProps } from 'react'
import classes from './table.module.css'

export type TableProps = ComponentProps<'table'>

export const Table = ({ children, ...otherProps }: TableProps) => (
	<table className={classes.table} {...otherProps}>
		{children}
	</table>
)
