import { memo } from 'react'
import { poly, type PolyProps } from '@klnjs/core'
import { IconTitle } from './IconTitle'
import { IconDescription } from './IconDescription'
import { IconPath } from './IconPath'
import { IconProvider } from './IconContext'
import { useIcon } from './useIcon'

export type IconProps = PolyProps<'svg'>

export const Icon = (props: IconProps) => {
	const icon = useIcon()

	return (
		<IconProvider value={icon}>
			<poly.svg
				fill="currentColor"
				aria-labelledby={icon.labelId}
				aria-describedby={icon.descriptionId}
				{...props}
			/>
		</IconProvider>
	)
}

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
	const Component = (props: IconProps) => (
		<Icon viewBox={viewBox} {...props}>
			{title ? <IconTitle>{title}</IconTitle> : null}
			{description ? (
				<IconDescription>{description}</IconDescription>
			) : null}

			<IconPath d={path} />
		</Icon>
	)

	Component.displayName = title
	return memo(Component)
}
