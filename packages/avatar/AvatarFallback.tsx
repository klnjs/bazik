import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useAvatarContext } from './AvatarContext'

export type AvatarFallbackProps = AsChildComponentProps<'span'>

export const AvatarFallback = forwardRef<'span', AvatarFallbackProps>(
	(props, forwardedRef) => {
		const avatar = useAvatarContext()

		if (avatar.ready) {
			return null
		}

		return <freya.span ref={forwardedRef} {...props} />
	}
)
