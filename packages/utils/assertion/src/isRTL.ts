export const isRTL = (element: Element | EventTarget) =>
	getComputedStyle(element as Element).direction === 'rtl'
