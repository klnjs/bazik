export const isElementRTL = (element: Element | null) => {
	if (!element || !window.getComputedStyle) {
		return false
	}

	return (
		window.getComputedStyle(element).getPropertyValue('direction') === 'rtl'
	)
}
