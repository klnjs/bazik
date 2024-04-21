import type { ComponentProps } from 'react'
import clsx from 'clsx'
import classes from './table.module.css'

export type TableProps = ComponentProps<'table'>

export const Table = ({ className, children, ...otherProps }: TableProps) => (
	<table className={clsx(classes.table, className)} {...otherProps}>
		{children}
	</table>
)
