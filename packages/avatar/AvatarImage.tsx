import { freya, forwardRef, chain, type AsChildComponentProps } from '../core'
import { useAvatarContext } from './AvatarContext'

export type AvatarImageProps = AsChildComponentProps<'img'>

export const AvatarImage = forwardRef<'img', AvatarImageProps>(
	({ onLoad, onError, ...otherProps }, forwardedRef) => {
		const avatar = useAvatarContext()
		const handleLoad = chain(onLoad, avatar.onLoad)
		const handleError = chain(onError, avatar.onError)

		return (
			<freya.img
				ref={forwardedRef}
				hidden={!avatar.ready}
				onLoad={handleLoad}
				onError={handleError}
				{...otherProps}
			/>
		)
	}
)
