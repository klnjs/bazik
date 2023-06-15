import { useMemo } from 'react'
import { clsx } from '../core'
import {
	avatar,
	avatarImage,
	avatarFallback,
	avatarSprinkles,
	type AvatarSprinkles
} from './Avatar.css'

export const useAvatarStyles = ({
	variant = 'round',
	palette = 'primary'
}: AvatarSprinkles = {}) =>
	useMemo(
		() => ({
			root: clsx(avatar, avatarSprinkles({ variant, palette })),
			image: avatarImage,
			fallback: avatarFallback
		}),
		[variant, palette]
	)
