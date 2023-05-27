import { forwardRef } from 'react'
import { Flex } from '../flex'
import { Typography } from '../typography'
import { useId } from '../utils/useId'
import { RadioBase, type RadioBaseProps } from './RadioBase'

export type RadioProps = RadioBaseProps & {
	label: string
	error?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
	{
		id: idProp,
		value,
		label,
		error,
		disabled,
		className,
		invalid = Boolean(error),
		...otherProps
	},
	ref
) {
	const id = useId(idProp)

	const baseId = `${id}-base`

	const labelId = `${id}-label`

	return (
		<Flex id={id} gap={2} alignItems='center' className={className}>
			<RadioBase
				id={baseId}
				ref={ref}
				value={value}
				invalid={invalid}
				disabled={disabled}
				aria-labelledby={label ? labelId : undefined}
				{...otherProps}
			/>

			<Typography
				as='label'
				id={labelId}
				fontSize={3}
				fontWeight='medium'
				htmlFor={baseId}
			>
				{label}
			</Typography>
		</Flex>
	)
})
