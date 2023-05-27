import { Typography, type TypographyProps } from './Typography'

export type HeadingProps = Omit<TypographyProps<'h2'>, 'as'> & {
	type?: 'h1' | 'h2' | 'h3' | 'h4'
}

export const Heading = ({
	type = 'h2',
	fontSize: fontSizeProp,
	...otherProps
}: HeadingProps) => {
	const fontSize = fontSizeProp ?? getFontSizeFromType(type)

	return <Typography as={type} fontSize={fontSize} {...otherProps} />
}

export const getFontSizeFromType = (
	type: HeadingProps['type']
): HeadingProps['fontSize'] => {
	switch (type) {
		case 'h1':
			return 7
		case 'h2':
			return 6
		case 'h3':
			return 5
		case 'h4':
			return 4
		default:
			throw Error('unsupported type')
	}
}
