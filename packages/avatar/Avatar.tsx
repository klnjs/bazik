import { useState, useCallback, type ElementType } from 'react'
import { clsx } from 'clsx'
import type { PolymorphicComponentProp } from '../utils/Component'
import * as classes from './Avatar.css'

export type AvatarProps = {
	src?: string
	alt?: string
	color?: keyof typeof classes.avatarVariants
}

export const Avatar = <C extends ElementType = 'div'>({
	as,
	src,
	alt,
	color = 'primary',
	children,
	className: classNameProp,
	...otherProps
}: PolymorphicComponentProp<C, AvatarProps>) => {
	const Component = as ?? 'div'

	const [load, setLoad] = useState(false)
	const [error, setError] = useState(false)

	const className = clsx(
		classNameProp,
		classes.avatarRoot,
		!load && classes.avatarVariants[color]
	)

	const handleLoad = useCallback(() => {
		setLoad(true)
	}, [])
	const handleError = useCallback(() => {
		setError(true)
	}, [])

	return (
		<Component className={className} {...otherProps}>
			{!src || error ? (
				children
			) : (
				<img
					src={src}
					alt={alt}
					className={classes.avatarImage}
					onLoad={handleLoad}
					onError={handleError}
				/>
			)}
		</Component>
	)
}
