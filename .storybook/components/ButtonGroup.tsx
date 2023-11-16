type ButtonGroupProps<T> = {
	value: T
	options: T[] | readonly T[]
	optionToString?: (value: T) => string
	onChange: (value: T) => void
}

export const ButtonGroup = <T extends string>({
	value,
	options,
	optionToString,
	onChange
}: ButtonGroupProps<T>) => (
	<div style={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
		{options.map((option) => (
			<button
				key={option}
				style={{
					borderWidth: 1,
					borderColor: 'black',
					borderStyle: 'dotted',
					borderRadius: 4,
					height: 32,
					minWidth: 120,
					paddingInline: 16,
					cursor: 'pointer',
					color: value === option ? 'white' : 'black',
					background: value === option ? 'blue' : 'white'
				}}
				onClick={() => onChange(option)}
			>
				{optionToString?.(option) ?? option}
			</button>
		))}
	</div>
)
