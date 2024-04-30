import { poly, type PolyProps } from '@klnjs/core'
import { AvatarProvider } from './AvatarContext'
import { useAvatar, type UseAvatarOptions } from './useAvatar'

export type AvatarProps = PolyProps<'div', UseAvatarOptions>

export const Avatar = 
	({ onStatusChange, ...otherProps }: AvatarProps) => {
		const avatar = useAvatar({ onStatusChange })

		return (
			<AvatarProvider value={avatar}>
				<poly.div  {...otherProps} />
			</AvatarProvider>
		)
	}
