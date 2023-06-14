import { useState } from 'react'
import {
	freya,
	forwardRef,
	clsx,
	chain,
	type AsChildComponentProps
} from '../core'
import { AvatarProvider } from './AvatarContext'
import { avatar, avatarSprinkles, type AvatarSprinkles } from './Avatar.css'

export type AvatarProps = AsChildComponentProps<
	'div',
	AvatarSprinkles & {
		onLoad?: () => void
		onError?: () => void
	}
>

export const Avatar = forwardRef<'div', AvatarProps>(
	(
		{
			variant = 'round',
			palette,
			className: classNameProp,
			onLoad,
			onError,
			...otherProps
		},
		forwardedRef
	) => {
		const [ready, setReady] = useState(false)
		const className = clsx(
			classNameProp,
			avatar,
			avatarSprinkles({ variant, palette })
		)

		const handleLoad = chain(onLoad, () => setReady(true))
		const handleError = chain(onError, () => setReady(false))

		return (
			<AvatarProvider
				value={{
					ready,
					setReady,
					onLoad: handleLoad,
					onError: handleError
				}}
			>
				<freya.div
					ref={forwardedRef}
					className={className}
					{...otherProps}
				/>
			</AvatarProvider>
		)
	}
)
