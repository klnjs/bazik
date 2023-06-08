import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion as Component } from './Accordion'
import { AccordionPanel } from './AccordionPanel'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Accordion: StoryObj<typeof Component> = {
	render: (args) => {
		const [expanded, setExpanded] = useState(1)
		const handleClick = (value: number) => () => setExpanded(value)

		return (
			<Component {...args}>
				<AccordionPanel
					title='Panel 1'
					expanded={expanded === 1}
					onChange={handleClick(1)}
				>
					Panel 1 content
				</AccordionPanel>
				<AccordionPanel
					title='Panel 2'
					expanded={expanded === 2}
					onChange={handleClick(2)}
				>
					Panel 2 content
				</AccordionPanel>
				<AccordionPanel
					title='Panel 3'
					expanded={expanded === 3}
					onChange={handleClick(3)}
				>
					Panel 3 content
				</AccordionPanel>
				<AccordionPanel
					title='Panel 4'
					expanded={expanded === 4}
					onChange={handleClick(4)}
				>
					Panel 4 content
				</AccordionPanel>
			</Component>
		)
	}
}
