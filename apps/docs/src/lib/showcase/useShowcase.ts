import { useState, useEffect, ElementType } from 'react'

export type UseShowcaseData = {
	code: string
	styles: string
	element: ElementType
}

export type UseShowcaseReturn =
	| {
			loading: false
			data: UseShowcaseData
	  }
	| {
			loading: true
			data: undefined
	  }

export const useShowcase = (name: string) => {
	const [data, setData] = useState<UseShowcaseData>()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchSources = async () => {
			if (data === undefined) {
				const jsx = await import(
					`@site/src/docs/02-components/${name}/${name}`
				)
				const src = await import(
					`!!raw-loader!@site/src/docs/02-components/${name}/${name}`
				)
				const css = await import(
					`!!raw-loader!@site/src/docs/02-components/${name}/${name}.module.css`
				)

				setData({
					code: src.default,
					styles: css.default,
					element: jsx.default
				})
				setLoading(false)
			}
		}

		fetchSources()
	}, [loading, data])

	return { loading, data } as UseShowcaseReturn
}
