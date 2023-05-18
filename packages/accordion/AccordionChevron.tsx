import { ChevronRight } from '../icon'

export type AccordionChevronProps = {
	expanded: boolean
	className?: string
}

export const AccordionChevron = ({
	expanded,
	className
}: AccordionChevronProps) => (
	<ChevronRight
		color='secondary'
		rotate={expanded ? 90 : 0}
		className={className}
	/>
)
