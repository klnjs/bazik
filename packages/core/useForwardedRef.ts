import {
	useRef,
	useImperativeHandle,
	type ForwardedRef,
	type RefObject
} from 'react'

export const useForwardedRef = <T>(
	forwardedRef: ForwardedRef<T>,
	ref?: RefObject<T>
) => {
	const refInner = useRef<T>(null)
	const refToUse = ref ?? refInner

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	useImperativeHandle(forwardedRef, () => refToUse.current!)

	return refToUse
}
