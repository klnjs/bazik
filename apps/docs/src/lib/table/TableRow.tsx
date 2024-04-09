import { ComponentProps } from 'react'

export type TableRowProps = ComponentProps<'tr'>

export const TableRow = ({ children, ...otherProps }: TableRowProps) => (
	<tr {...otherProps}>{children}</tr>
)
