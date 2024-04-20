import CodeBlock from '@theme/CodeBlock'
import clsx from 'clsx'
import classes from './Snippet.module.css'

export type SnippetProps = {
	children: string
	className?: string
	language?: string
	identation?: number
	showLineNumbers?: boolean
}

export const Snippet = ({
	children,
	className,
	language,
	identation = 2,
	showLineNumbers = true
}: SnippetProps) => {
	const indent = new Array(identation).fill(' ').join('')

	return (
		<div className={clsx(classes.snippet, className)}>
			<CodeBlock language={language} showLineNumbers={showLineNumbers}>
				{children.replace(/\t/g, indent)}
			</CodeBlock>
		</div>
	)
}
