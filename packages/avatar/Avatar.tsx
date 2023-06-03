import { useState, useCallback, type ElementType } from 'react'
import { clsx } from 'clsx'
import type { PolymorphicComponentProp } from '../utils/Component'
import * as classes from './Avatar.css'

export type AvatarProps = {
	src?: string
	alt?: string
	size?: keyof typeof classes.avatarSizes
	color?: keyof typeof classes.avatarVariants
}

export const Avatar = <C extends ElementType = 'div'>({
	as,
	src,
	alt,
	size = 3,
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
		classes.avatarSizes[size],
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
