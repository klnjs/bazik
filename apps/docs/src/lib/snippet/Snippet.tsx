import CodeBlock, { Props as CodeBlockProps } from '@theme/CodeBlock'
import clsx from 'clsx'
import classes from './Snippet.module.css'

export type SnippetProps = {
	children: string
	className?: string
	language?: CodeBlockProps['language']
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
		<div className={clsx(className, classes.snippet)}>
			<CodeBlock language={language} showLineNumbers={showLineNumbers}>
				{children.replace(/\t/g, indent)}
			</CodeBlock>
		</div>
	)
}
