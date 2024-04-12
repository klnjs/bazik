import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import { Snippet } from '../snippet'
import { useShowcase } from './useShowcase'
import classes from './Showcase.module.css'

export type ShowcaseProps = {
	name: string
}

export const Showcase = ({ name }: ShowcaseProps) => {
	const { loading, data } = useShowcase(name)

	if (loading) {
		return null
	}

	const { code, styles, element: Element } = data

	return (
		<div className={classes.showcase}>
			<div className={classes.viewport}>
				<Element />
			</div>
			<Tabs>
				<TabItem value="code" label="index.tsx">
					<Snippet language="jsx" className={classes.snippet}>
						{code}
					</Snippet>
				</TabItem>
				<TabItem
					value="styles"
					label="index.module.css"
					className={classes.tab}
				>
					<Snippet language="css" className={classes.snippet}>
						{styles}
					</Snippet>
				</TabItem>
			</Tabs>
		</div>
	)
}
