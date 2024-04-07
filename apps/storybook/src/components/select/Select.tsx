export type SelectProps<T extends string> = {
	value: string
	label: string
	action?: string
	options: { label?: string; value: T }[]
	onChange: (value: T) => void
	onAction?: () => void
}

export const Select = <T extends string>({
	value,
	label,
	action,
	options,
	onChange,
	onAction
}: SelectProps<T>) => (
	<div
		style={{
			display: 'grid',
			gridAutoFlow: 'row',
			gridTemplateColumns: `repeat(${action ? 2 : 1}, 1fr)`,
			gap: 4
		}}
	>
		<label style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</label>
		{Boolean(action) && (
			<button
				style={{
					background: 0,
					border: 0,
					color: '#adf0dd',
					padding: 0,
					width: 'fit-content',
					cursor: 'pointer',
					justifySelf: 'end'
				}}
				onClick={onAction}
			>
				{action}
			</button>
		)}
		<select
			value={value}
			style={{
				border: '1px solid #363a3f',
				borderRadius: 4,
				height: 28,
				outline: 0,
				paddingInline: 8,
				gridColumnStart: 1,
				gridColumnEnd: action ? 3 : 1
			}}
			onChange={(event) => onChange(event.target.value as T)}
		>
			{options.map((option) => (
				<option value={option.value}>
					{option.label ?? option.value}
				</option>
			))}
		</select>
	</div>
)
