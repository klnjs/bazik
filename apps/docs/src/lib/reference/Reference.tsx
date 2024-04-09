import { Highlight } from '../highlight'
import { Table, TableCell, TableRow } from '../table'

export type ReferenceProp = {
	name: string
	type: string
	defaultValue: string
}

export type ReferenceAttr = {
	name: string
	description: string
}

export type ReferenceProps = {
	title: string
	props?: ReferenceProp[]
	attrs?: ReferenceAttr[]
}

export const Reference = ({
	title,
	props,
	attrs,
	...otherProps
}: ReferenceProps) => (
	<div {...otherProps}>
		{props && (
			<Table>
				<thead>
					<TableRow>
						<TableCell as="th">Prop</TableCell>
						<TableCell as="th">Type</TableCell>
						<TableCell as="th">Default</TableCell>
					</TableRow>
				</thead>
				<tbody>
					{props.map(({ name, type, defaultValue = '-' }) => (
						<TableRow>
							<TableCell>
								<Highlight>{name}</Highlight>
							</TableCell>
							<TableCell>{type}</TableCell>
							<TableCell>{defaultValue}</TableCell>
						</TableRow>
					))}
				</tbody>
			</Table>
		)}

		{attrs && (
			<Table>
				<thead>
					<TableRow>
						<TableCell as="th">Data attribute</TableCell>
						<TableCell as="th">Condition</TableCell>
					</TableRow>
				</thead>
				<tbody>
					{attrs.map(({ name, description }) => (
						<TableRow>
							<TableCell>
								<Highlight>{name}</Highlight>
							</TableCell>
							<TableCell>{description}</TableCell>
						</TableRow>
					))}
				</tbody>
			</Table>
		)}
	</div>
)
