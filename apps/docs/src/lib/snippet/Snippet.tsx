import CodeBlock, { Props as CodeBlockProps } from '@theme/CodeBlock'

export type ShowcaseProps = {
	children: string
	className?: string
	language?: CodeBlockProps['language']
	identation?: number
	showLineNumbers?: boolean
}

export const Snippet = ({
	children,
	language,
	className,
	identation = 2,
	showLineNumbers = true
}: ShowcaseProps) => {
	const indent = new Array(identation).fill(' ').join('')

	return (
		<CodeBlock
			language={language}
			showLineNumbers={showLineNumbers}
			className={className}
		>
			{children.replace(/\t/g, indent)}
		</CodeBlock>
	)
}
