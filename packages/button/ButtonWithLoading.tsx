import { Flex } from '../flex'
import { Ellipsis } from '../loading'
import { type PolymorphicComponentProp } from '../utils/Component'
import { Button, type ButtonProps } from './Button'

export type ButtonWithLoadingProps = ButtonProps & {
	busy?: boolean
}

export const ButtonWithLoading = ({
	busy,
	'aria-busy': ariaBusy = busy,
	children,
	...otherProps
}: PolymorphicComponentProp<'button', ButtonWithLoadingProps>) => (
	<Button aria-busy={ariaBusy} {...otherProps}>
		<Flex
			gap='inherit'
			alignItems='center'
			justifyContent='center'
			style={{ visibility: busy ? 'hidden' : 'visible' }}
		>
			{children}
		</Flex>

		{busy ? (
			<Ellipsis
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)'
				}}
			/>
		) : null}
	</Button>
)
