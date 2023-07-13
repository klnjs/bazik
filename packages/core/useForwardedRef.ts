import { useImperativeHandle, type ForwardedRef, type RefObject } from 'react'

export const useForwardedRef = <T>(
	ref: RefObject<T>,
	forwardedRef: ForwardedRef<T>
) => {
	// https://github.com/facebook/react/issues/16873
	// const ref = useRef(initialValue)

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	useImperativeHandle(forwardedRef, () => ref.current!)

	// return ref
}
