import { ComponentProps } from 'react'
import clsx from 'clsx'
import classes from './table.module.css'

export type TableCellType = 'td' | 'th'

export type TableCellProps<T extends TableCellType> = ComponentProps<T> & {
	as?: T
}

export const TableCell = <T extends TableCellType = 'td'>({
	as,
	className: classNameProp,
	children,
	...otherProps
}: TableCellProps<T>) => {
	const Component = as ?? 'td'
	const className = clsx(classes.cell, classNameProp, {
		[classes.td]: as === 'td' || as === undefined,
		[classes.th]: as === 'th'
	})

	return (
		<Component className={className} {...otherProps}>
			{children}
		</Component>
	)
}
