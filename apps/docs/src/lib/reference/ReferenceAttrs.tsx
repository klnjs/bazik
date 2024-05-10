import { Table, TableCell, TableRow } from '../table'
import classes from './Reference.module.css'

export type ReferenceAttr = {
	name: string
	text?: string
	values?: string
}

export type ReferenceAttrsProps = {
	attrs: ReferenceAttr[]
}

export const ReferenceAttrs = ({ attrs: attributes }: ReferenceAttrsProps) => (
	<Table className={classes.table}>
		<thead>
			<TableRow>
				<TableCell as="th">Data attribute</TableCell>
				<TableCell as="th">Present when</TableCell>
			</TableRow>
		</thead>
		<tbody>
			{attributes.map(({ name, text, values }) => (
				<TableRow key={name}>
					<TableCell className={classes.prop}>{name}</TableCell>
					<TableCell>
						{values !== undefined ? <code>{values}</code> : text}
					</TableCell>
				</TableRow>
			))}
		</tbody>
	</Table>
)
