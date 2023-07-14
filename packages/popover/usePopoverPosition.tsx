export type Property = 'start' | 'end'

export type Block = `block-${Property}`

export type Inline = `inline-${Property}`

export type Logical = Block | Inline

export type Placement = Property | `${Property} ${Property}`

export const getLogicalPosition = (element: HTMLElement, position: Logical) => {
	const rect = element.getBoundingClientRect()
	const { direction } = getComputedStyle(element)

	if (direction === 'rtl') {
		switch (position) {
			case 'block-start':
				return rect.top
			case 'block-end':
				console.log(window.innerHeight, rect.bottom)

				return window.innerHeight - rect.bottom
			case 'inline-start':
				return window.innerWidth - rect.right
			case 'inline-end':
				return window.innerWidth - rect.left
			default:
				throw new Error('Unsupported position')
		}
	}

	switch (position) {
		case 'block-start':
			return rect.top
		case 'block-end':
			console.log(window.innerHeight, rect.bottom)
			return window.innerHeight - rect.bottom
		case 'inline-start':
			return rect.left
		case 'inline-end':
			return window.innerWidth - rect.right
		default:
			throw new Error('Unsupported position')
	}
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

export const getLogicalProperties = (placement: Placement): [Block, Inline] => {
	const [block, inline = block] = placement.split(' ') as [Property, Property]

	return [`block-${block}`, `inline-${inline}`]
}
