import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { AvatarProvider } from './AvatarContext'
import { useAvatar, type UseAvatarOptions } from './useAvatar'

export type AvatarProps = CoreProps<'div', UseAvatarOptions>

export const Avatar = forwardRef<'div', AvatarProps>(
	({ onStatusChange, ...otherProps }, forwardedRef) => {
		const avatar = useAvatar({ onStatusChange })

		return (
			<AvatarProvider value={avatar}>
				<poly.div ref={forwardedRef} {...otherProps} />
			</AvatarProvider>
		)
	}
)
