import { freya, forwardRef, type CoreProps } from '../core'
import { AvatarProvider } from './AvatarContext'
import { useAvatar, type UseAvatarOptions } from './useAvatar'

export type AvatarProps = CoreProps<'div', UseAvatarOptions>

export const Avatar = forwardRef<'div', AvatarProps>((props, forwardedRef) => {
	const avatar = useAvatar()

	return (
		<AvatarProvider value={avatar}>
			<freya.div ref={forwardedRef} {...props} />
		</AvatarProvider>
	)
})
