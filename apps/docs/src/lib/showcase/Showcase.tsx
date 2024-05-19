import type { ReactNode } from 'react'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import { Snippet } from '../snippet'
import classes from './Showcase.module.css'

export type ShowcaseSource = {
	file: string
	content: string
	language: string
}

export type ShowcaseProps = {
	name: string
	sources?: ShowcaseSource[]
	children: ReactNode
}

export const Showcase = ({ name, sources, children }: ShowcaseProps) => (
	<div className={classes.showcase} aria-label={name}>
		<div className={classes.viewport}>{children}</div>

		{sources ? (
			<Tabs>
				{sources.map(({ file, content, language }) => (
					<TabItem key={file} value={file} label={file}>
						<Snippet
							language={language}
							className={classes.snippet}
						>
							{content}
						</Snippet>
					</TabItem>
				))}
			</Tabs>
		) : null}
	</div>
)
