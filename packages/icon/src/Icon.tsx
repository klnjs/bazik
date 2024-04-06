import { memo } from 'react'
import { forwardRef, type CoreProps } from '@klnjs/core'
import { IconTitle } from './IconTitle'
import { IconDescription } from './IconDescription'
import { IconPath } from './IconPath'

export type IconProps = CoreProps<'svg'>

export const Icon = forwardRef<'svg', IconProps>((props, forwardedRef) => (
	<svg
		ref={forwardedRef}
		fill="currentColor"
		stroke="none"
		aria-hidden={true}
		{...props}
	/>
))

export const createIcon = ({
	title,
	description,
	path,
	viewBox
}: {
	title?: string
	description?: string
	path: string
	viewBox: string
}) => {
	const Component = forwardRef<'svg', IconProps>((props, forwardedRef) => (
		<Icon ref={forwardedRef} viewBox={viewBox} {...props}>
			{title ? <IconTitle>{title}</IconTitle> : null}
			{description ? (
				<IconDescription>{description}</IconDescription>
			) : null}

			<IconPath d={path} />
		</Icon>
	))

	Component.displayName = title
	return memo(Component)
}
