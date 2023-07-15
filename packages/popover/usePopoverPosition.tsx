export type Property = 'start' | 'end' | 'center'

export type Block = `block-${Property}`

export type Inline = `inline-${Property}`

export type Logical = Block | Inline

export type Placement = Property | `${Property} ${Property}`

export const getLogicalPosition = (
	element: HTMLElement,
	direction: string,
	position: Logical
) => {
	const rect = element.getBoundingClientRect()

	switch (position) {
		case 'block-start':
			return rect.top
		case 'block-end':
			return rect.bottom
		case 'block-center':
			return rect.top + rect.height / 2
		case 'inline-start':
			return direction === 'rtl'
				? window.innerWidth - rect.right
				: rect.left
		case 'inline-end':
			return direction === 'rtl'
				? window.innerWidth - rect.left
				: rect.right
		case 'inline-center':
			return direction === 'rtl'
				? window.innerWidth - (rect.left + rect.width / 2)
				: rect.right - rect.width / 2
		default:
			throw new Error('Unsupported position')
	}
}

export const getLogicalOffset = (element: HTMLElement, position: Logical) => {
	const rect = element.getBoundingClientRect()

	switch (position) {
		case 'block-start':
			return 0
		case 'block-end':
			return rect.height
		case 'block-center':
			return rect.height / 2
		case 'inline-start':
			return 0
		case 'inline-end':
			return rect.width
		case 'inline-center':
			return rect.width / 2
		default:
			throw new Error('Unsupported position')
	}
}

export const getLogicalProperties = (placement: Placement): [Block, Inline] => {
	const [block, inline = block] = placement.split(' ') as [Property, Property]

	return [`block-${block}`, `inline-${inline}`]
}
