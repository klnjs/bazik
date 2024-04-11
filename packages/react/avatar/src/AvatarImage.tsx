import { poly, chain, forwardRef, type CoreProps } from '@klnjs/core'
import { useAvatarContext } from './AvatarContext'

export type AvatarImageProps = CoreProps<'img'>

export const AvatarImage = forwardRef<'img', AvatarImageProps>(
	(
		{ src, style: styleProp, onLoad, onLoadStart, onError, ...otherProps },
		forwardedRef
	) => {
		const { status, setStatus } = useAvatarContext()

		const style = {
			display: status !== 'loaded' ? 'none' : undefined,
			...styleProp
		}

		const handleLoad = chain(onLoad, () => setStatus('loaded'))

		const handleLoadStart = chain(onLoadStart, () => setStatus('loading'))

		const handleError = chain(onError, () => setStatus('error'))

		return (
			<poly.img
				ref={forwardedRef}
				src={src}
				style={style}
				onLoad={handleLoad}
				onLoadStart={handleLoadStart}
				onError={handleError}
				{...otherProps}
			/>
		)
	}
)
