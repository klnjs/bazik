import {
	freya,
	forwardRef,
	clsx,
	chain,
	type AsChildComponentProps
} from '../core'
import { useAvatarContext } from './AvatarContext'
import { image } from './Avatar.css'

export type AvatarImageProps = AsChildComponentProps<'img'>

export const AvatarImage = forwardRef<'img', AvatarImageProps>(
	(
		{ className: classNameProp, onLoad, onError, ...otherProps },
		forwardedRef
	) => {
		const avatar = useAvatarContext()
		const className = clsx(classNameProp, image)
		const handleLoad = chain(onLoad, avatar.onLoad)
		const handleError = chain(onError, avatar.onError)

		return (
			<freya.img
				ref={forwardedRef}
				hidden={!avatar.ready}
				className={className}
				onLoad={handleLoad}
				onError={handleError}
				{...otherProps}
			/>
		)
	}
)
