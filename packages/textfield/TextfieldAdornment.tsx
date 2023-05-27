import { type ReactNode } from 'react'
import clsx from 'clsx'
import * as classes from './TextFieldAdornment.css'

export type TextfieldAdornmentProps = {
	alignment?: 'field' | 'center'
	children: ReactNode
}

export const TextfieldAdornment = ({
	alignment = 'field',
	children
}: TextfieldAdornmentProps) => {
	const className = clsx(classes.textfieldAdornmentRoot, {
		[classes.textfieldAdornmentField]: alignment === 'field',
		[classes.textfieldAdornmentCenter]: alignment === 'center'
	})

	return <span className={className}>{children}</span>
}
