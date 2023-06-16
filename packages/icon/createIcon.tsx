import { memo } from 'react'
import { forwardRef } from '../core'
import { Icon, type IconProps } from './Icon'
import { IconTitle } from './IconTitle'
import { IconDescription } from './IconDescription'
import { IconPath } from './IconPath'

export type CreateIconOptions = {
	title?: string
	description?: string
	path: string
	viewBox: string
}

export const createIcon = ({
	title,
	description,
	path,
	viewBox
}: CreateIconOptions) => {
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
