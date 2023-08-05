import { freya, chain, forwardRef, type CoreProps } from '../core'
import { useAvatarContext } from './AvatarContext'

export type AvatarImageProps = CoreProps<'img'>

export const AvatarImage = forwardRef<'img', AvatarImageProps>(
	({ onLoad, onError, ...otherProps }, forwardedRef) => {
		const { ready, setReady } = useAvatarContext()

		const handleLoad = chain(onLoad, () => setReady(true))
		const handleError = chain(onError, () => setReady(false))

		return (
			<freya.img
				ref={forwardedRef}
				hidden={!ready}
				onLoad={handleLoad}
				onError={handleError}
				{...otherProps}
			/>
		)
	}
)
