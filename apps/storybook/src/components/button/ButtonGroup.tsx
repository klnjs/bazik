type ButtonGroupProps<T> = {
	value: T
	label: string
	options: T[] | readonly T[]
	optionToString?: (value: T) => string
	onChange: (value: T) => void
}

export const ButtonGroup = <T extends string>({
	value,
	label,
	options,
	optionToString,
	onChange
}: ButtonGroupProps<T>) => (
	<div style={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
		<label style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</label>
		{options.map((option) => (
			<button
				key={option}
				style={{
					borderWidth: 1,
					borderColor: value === option ? 'inherit' : '#363a3f',
					borderStyle: 'solid',
					borderRadius: 4,
					height: 28,
					minWidth: 120,
					paddingInline: 16,
					cursor: 'pointer',
					color: 'inherit',
					background: value === option ? '#363a3f' : 'inherit'
				}}
				onClick={() => onChange(option)}
			>
				{optionToString?.(option) ?? option}
			</button>
		))}
	</div>
)
