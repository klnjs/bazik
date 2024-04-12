import { useState } from 'react'

export const useIcon = () => {
	const [labelId, setLabelId] = useState<string>()

	const [descriptionId, setDescriptionId] = useState<string>()

	return {
		labelId,
		descriptionId,
		setLabelId,
		setDescriptionId
	}
}
