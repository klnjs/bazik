import { Flex } from '../flex'
import { type PolymorphicComponentProp } from '../utils/Component'

export type AccordionProps = PolymorphicComponentProp<'div'>

export const Accordion = ({ children, ...otherProps }: AccordionProps) => (
	<Flex flexDirection='column' {...otherProps}>
		{children}
	</Flex>
)
