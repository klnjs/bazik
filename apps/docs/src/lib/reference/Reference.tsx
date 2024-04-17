import { Table, TableCell, TableRow } from '../table'
import { Highlight } from '../highlight'
import { ReferenceInfo } from './ReferenceInfo'
import classes from './Reference.module.css'

export type ReferenceProp = {
	name: string
	type: string
	typeAdvanced?: string
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
					{props.map(
						({ name, type, typeAdvanced, defaultValue = '-' }) => (
							<TableRow>
								<TableCell className={classes.prop}>
									{name}
								</TableCell>
								<TableCell className={classes.type}>
									{type}
									{typeAdvanced && (
										<ReferenceInfo>
											{typeAdvanced}
										</ReferenceInfo>
									)}
								</TableCell>
								<TableCell>{defaultValue}</TableCell>
							</TableRow>
						)
					)}
				</tbody>
			</Table>
		)}

		{attrs && (
			<Table>
				<thead>
					<TableRow>
						<TableCell as="th">Data attribute</TableCell>
						<TableCell as="th">Present when</TableCell>
					</TableRow>
				</thead>
				<tbody>
					{attrs.map(({ name, description }) => (
						<TableRow>
							<TableCell className={classes.prop}>
								{name}
							</TableCell>
							<TableCell>{description}</TableCell>
						</TableRow>
					))}
				</tbody>
			</Table>
		)}
	</div>
)
