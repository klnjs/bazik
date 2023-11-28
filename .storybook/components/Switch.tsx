export type SwitchProps = {
	checked: boolean
	label: string
	onChange: (checked: boolean) => void
}

export const Switch = ({ checked, label, onChange }: SwitchProps) => (
	<div
		style={{
			display: 'flex',
			gap: 4,
			alignItems: 'center',
			justifyContent: 'space-between'
		}}
	>
		<label style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</label>
		<input
			type="checkbox"
			checked={checked}
			style={{
				margin: 0,
				height: 28,
				width: 28,
				cursor: 'pointer',
				borderWidth: 1,
				borderColor: 'black',
				borderStyle: 'solid',
				borderRadius: 4
			}}
			onChange={(event) => onChange(event.target.checked)}
		/>
	</div>
)
