import { ComponentProps } from 'react'

export type TableProps = ComponentProps<'table'>

export const Table = ({ children, ...otherProps }: TableProps) => (
	<table {...otherProps}>{children}</table>
)
