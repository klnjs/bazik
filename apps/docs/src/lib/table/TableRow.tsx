import type { ComponentProps } from 'react'
import clsx from 'clsx'
import classes from './table.module.css'

export type TableRowProps = ComponentProps<'tr'>

export const TableRow = ({
	className,
	children,
	...otherProps
}: TableRowProps) => (
	<tr className={clsx(classes.row, className)} {...otherProps}>
		{children}
	</tr>
)
