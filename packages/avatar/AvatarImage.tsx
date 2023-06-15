import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { useAvatarContext } from './AvatarContext'

export type AvatarImageProps = AsChildComponentProps<'img'>

export const AvatarImage = forwardRef<'img', AvatarImageProps>(
	(props, forwardedRef) => {
		const { imageProps } = useAvatarContext()
		const mergedProps = mergeProps(props, imageProps)

		return <freya.img ref={forwardedRef} {...mergedProps} />
	}
)
