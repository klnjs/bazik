export const isElementRTL = (element: HTMLElement | null) => {
	if (!element || typeof window === 'undefined') {
		return false
	}

	return (
		window.getComputedStyle(element).getPropertyValue('direction') === 'rtl'
	)
}
