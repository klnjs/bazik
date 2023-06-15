import { useState } from 'react'
import { freya, forwardRef, chain, type AsChildComponentProps } from '../core'
import { AvatarProvider } from './AvatarContext'

export type AvatarProps = AsChildComponentProps<
	'div',
	{
		onLoad?: () => void
		onError?: () => void
	}
>

export const Avatar = forwardRef<'div', AvatarProps>(
	({ onLoad, onError, ...otherProps }, forwardedRef) => {
		const [ready, setReady] = useState(false)
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
				<freya.div ref={forwardedRef} {...otherProps} />
			</AvatarProvider>
		)
	}
)
