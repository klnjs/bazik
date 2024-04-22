import { Table, TableCell, TableRow } from '../table'
import { ReferenceInfo } from './ReferenceInfo'
import classes from './Reference.module.css'

export type ReferenceProp = {
	name: string
	type: string
	typeAdvanced?: string
	defaultValue: string
}

export type ReferencePropsProps = {
	props: ReferenceProp[]
}

export const ReferenceProps = ({ props: properties }: ReferencePropsProps) => (
	<Table className={classes.table}>
		<thead>
			<TableRow>
				<TableCell as="th">Prop</TableCell>
				<TableCell as="th">Type</TableCell>
				<TableCell as="th">Default</TableCell>
			</TableRow>
		</thead>
		<tbody>
			{properties.map(
				({ name, type, typeAdvanced, defaultValue = '-' }) => (
					<TableRow>
						<TableCell className={classes.prop}>{name}</TableCell>
						<TableCell className={classes.type}>
							{type}
							{typeAdvanced ? (
								<ReferenceInfo>{typeAdvanced}</ReferenceInfo>
							) : null}
						</TableCell>
						<TableCell>{defaultValue}</TableCell>
					</TableRow>
				)
			)}
		</tbody>
	</Table>
)
