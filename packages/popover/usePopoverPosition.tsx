export type Direction = 'ltr' | 'rtl'

export type Dimension = 'block' | 'inline'

export type Property = 'start' | 'end' | 'center'

export type Placement = Property | `${Property} ${Property}`

export const getLogicalPosition = (
	element: HTMLElement,
	dimension: Dimension,
	property: Property
) => {
	// Bug here somewhere which makes the position
	const rect = element.getBoundingClientRect()
	const { direction } = getComputedStyle(element)

	if (dimension === 'block') {
		if (property === 'start') {
			return rect.top
		} else if (property === 'end') {
			return rect.bottom
		}

		return rect.top + rect.height / 2
	}

	if (direction === 'ltr') {
		if (property === 'start') {
			return rect.left
		} else if (property === 'end') {
			return rect.right
		}
	}

	if (property === 'start') {
		return rect.right
	} else if (property === 'end') {
		return rect.left
	}

	return rect.left + rect.width / 2
}

export const getLogicalOffset = (
	element: HTMLElement,
	dimension: Dimension,
	property: Property
) => {
	if (property === 'start') {
		return 0
	}

	const rect = element.getBoundingClientRect()
	const value = dimension === 'block' ? rect.height : rect.width

	return property === 'center' ? value / 2 : value
}

export const getLogicalProperties = (placement: Placement) => {
	const [block, inline = block] = placement.split(' ') as [Property, Property]

	return [block, inline]
}
