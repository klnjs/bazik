import { freya, forwardRef, clsx, type AsChildComponentProps } from '../core'
import { useAvatarContext } from './AvatarContext'
import { fallback } from './Avatar.css'

export type AvatarFallbackProps = AsChildComponentProps<'span'>

export const AvatarFallback = forwardRef<'span', AvatarFallbackProps>(
	({ className: classNameProp, ...otherProps }, forwardedRef) => {
		const avatar = useAvatarContext()
		const className = clsx(classNameProp, fallback)

		if (avatar.ready) {
			return null
		}

		return (
			<freya.span
				ref={forwardedRef}
				className={className}
				{...otherProps}
			/>
		)
	}
)
