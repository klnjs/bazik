import { ComponentProps } from 'react'
import classes from './table.module.css'

export type TableRowProps = ComponentProps<'tr'>

export const TableRow = ({ children, ...otherProps }: TableRowProps) => (
	<tr className={classes.row} {...otherProps}>
		{children}
	</tr>
)
