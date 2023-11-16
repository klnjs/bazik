export type SwitchProps = {
	checked: boolean
	label: string
	onChange: (checked: boolean) => void
}

export const Switch = ({ checked, label, onChange }: SwitchProps) => (
	<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
		<input
			type="checkbox"
			checked={checked}
			onChange={(event) => onChange(event.target.checked)}
		/>
		<label style={{ fontSize: 14 }}>{label}</label>
	</div>
)
