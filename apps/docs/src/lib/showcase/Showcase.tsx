import { ElementType } from 'react'
import { Browser } from '../browser'

export type ShowcaseProps = {
	url?: string
	component: ElementType
}

export const Showcase = ({ url, component: Component }: ShowcaseProps) => {
	return (
		<Browser url={url}>
			<Component />
		</Browser>
	)
}
