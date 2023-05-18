import { Typography, TypographyProps } from './Typography'

export type ParagraphProps = Omit<TypographyProps<'p'>, 'as'>

export const Paragraph = ({ ...otherProps }: ParagraphProps) => (
	<Typography as='p' {...otherProps} />
)
