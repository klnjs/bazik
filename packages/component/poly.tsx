import type { ReactNode, ElementType, CSSProperties } from 'react'
import { forwardRef, polymorphicFactory } from '@polymorphic-factory/react'
import clsx from 'clsx'
import { polySprinkles, type PolySprinkles } from './poly.css'

export type PolyPropsBase = {
	as?: ElementType
	sx?: PolySprinkles
	style?: CSSProperties
	children?: ReactNode
	className?: string
}

export type PolyProps = PolyPropsBase & PolySprinkles

export const poly = polymorphicFactory<PolyProps>({
	styled: (component) =>
		forwardRef((props, ref) => {
			const [
				{
					as,
					sx,
					style,
					children,
					className: classNameProp,
					...otherProps
				},
				sprinklesProps
			] = extractProperties(props, polySprinkles.properties)

			const Component = as ?? component

			const className = clsx(
				classNameProp,
				polySprinkles({ ...sprinklesProps, ...sx })
			)

			return (
				<Component
					ref={ref}
					style={style}
					className={className}
					{...otherProps}
				>
					{children}
				</Component>
			)
		})
})

function extractProperties<T extends object, K extends keyof T>(
	props: T,
	propsToExtract: Array<K> | Set<K>
): [Exclude<T, K>, Pick<T, K>] {
	const pick: Pick<T, K> = {} as Pick<T, K>
	const omit: Exclude<T, K> = {} as Exclude<T, K>
	const shouldPick = Array.isArray(propsToExtract)
		? (key: unknown): key is K => propsToExtract.includes(key as K)
		: (key: unknown): key is K => propsToExtract.has(key as K)

	for (const key in props) {
		if (shouldPick(key)) {
			pick[key] = props[key]
		} else {
			// @ts-expect-error because ???
			omit[key] = props[key]
		}
	}

	return [omit, pick]
}
