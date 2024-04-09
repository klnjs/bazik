import { ComponentProps } from 'react'

export type TableCellType = 'td' | 'th'

export type TableCellProps<T extends TableCellType> = ComponentProps<T> & {
	as?: T
}

export const TableCell = <T extends TableCellType = 'td'>({
	as,
	children,
	...otherProps
}: TableCellProps<T>) => {
	const Component = as ?? 'td'

	return <Component {...otherProps}>{children}</Component>
}
