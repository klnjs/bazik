import { Table, TableCell, TableRow } from '../table'

export type ReferencePropsProps = {
	name: string
	type: string
	defaultValue: string
}

export type ReferenceProps = {
	title: string
	props: ReferencePropsProps[]
}

export const Reference = ({ title, props, ...otherProps }: ReferenceProps) => (
	<div {...otherProps}>
		<h2>{title}</h2>
		<Table>
			<thead>
				<TableRow>
					<TableCell as="th">Prop</TableCell>
					<TableCell as="th">Type</TableCell>
					<TableCell as="th">Default</TableCell>
				</TableRow>
			</thead>
			<tbody>
				{props.map(({ name, type, defaultValue }) => (
					<TableRow>
						<TableCell>{name}</TableCell>
						<TableCell>{type}</TableCell>
						<TableCell>{defaultValue}</TableCell>
					</TableRow>
				))}
			</tbody>
		</Table>
	</div>
)
