import { useId } from 'react'

export type SwitchProps = {
	checked: boolean
	label: string
	onChange: (checked: boolean) => void
}

export const Switch = ({ checked, label, onChange }: SwitchProps) => {
	const id = useId()

	return (
		<div
			style={{
				display: 'flex',
				gap: 4,
				alignItems: 'center',
				justifyContent: 'space-between'
			}}
		>
			<label htmlFor={id} style={{ fontSize: 14, fontWeight: 'bold' }}>
				{label}
			</label>
			<input
				id={id}
				type="checkbox"
				checked={checked}
				style={{
					margin: 0,
					height: 18,
					width: 18,
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
}
