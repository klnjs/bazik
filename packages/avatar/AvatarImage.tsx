import { freya, forwardRef, type CoreProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { useAvatarContext } from './AvatarContext'

export type AvatarImageProps = CoreProps<'img'>

export const AvatarImage = forwardRef<'img', AvatarImageProps>(
	(props, forwardedRef) => {
		const { imageProps } = useAvatarContext()
		const mergedProps = mergeProps(props, imageProps)

		return <freya.img ref={forwardedRef} {...mergedProps} />
	}
)
