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
	propsToExtract: Set<K>
): [Exclude<T, K>, Pick<T, K>] {
	const extracted: Pick<T, K> = {} as Pick<T, K>
	const remaining: Exclude<T, K> = {} as Exclude<T, K>

	// Extract properties from obj1 that are present in obj2
	for (const prop in props) {
		if (propsToExtract.has(prop as unknown as K)) {
			extracted[prop] = props[prop]
		} else {
			remaining[prop] = props[prop]
		}
	}

	return [remaining, extracted]
}
