export type TextFieldProps = {
	type?: 'text' | 'number'
	value?: string
	label: string
	action?: string
	placeholder?: string
	onChange: (value: string) => void
	onAction?: () => void
}

export const TextField = ({
	type,
	value,
	label,
	action,
	placeholder,
	onChange,
	onAction
}: TextFieldProps) => (
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
					color: 'teal',
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
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			style={{
				borderWidth: 1,
				borderColor: 'black',
				borderStyle: 'solid',
				borderRadius: 4,
				height: 28,
				outline: 0,
				paddingInline: 8,
				gridColumnStart: 1,
				gridColumnEnd: action ? 3 : 1
			}}
			onChange={(event) => onChange(event.target.value)}
		/>
	</div>
)
