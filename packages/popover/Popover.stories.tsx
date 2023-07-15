import type { Meta, StoryObj } from '@storybook/react'
import { useState, type MouseEvent } from 'react'
import { Popover } from './Popover'
import * as classes from './Popover.stories.css'

export default {
	title: 'Popover',
	component: Popover
} satisfies Meta<typeof Popover>

export const Default: StoryObj<typeof Popover> = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [anchor, setAnchor] = useState<HTMLElement>()

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [direction, setDirection] = useState('ltr')

		const handleOpen = ({ target }: MouseEvent) =>
			setAnchor((prev) => (prev ? undefined : (target as HTMLElement)))

		const handleClose = () => {
			console.log('close now')
			setAnchor(undefined)
		}

		return (
			<div className={classes.story}>
				<div className={classes.controls}>
					<h2>Controls</h2>

					<button onClick={() => setDirection('ltr')}>Set LTR</button>

					<button onClick={() => setDirection('rtl')}>Set RTL</button>
				</div>

				<div dir={direction} className={classes.section}>
					<button className={classes.anchor} onClick={handleOpen}>
						Open
					</button>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='start start'
						anchorAlignment='end end'
						className={classes.popover}
						{...args}
						onClose={handleClose}
					>
						SS
					</Popover>

					{/* 
					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='start center'
						anchorAlignment='end center'
						className={classes.popover}
						{...args}
					>
						SEC
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='start end'
						anchorAlignment='end start'
						className={classes.popover}
						{...args}
					>
						SE
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='center end'
						anchorAlignment='center start'
						className={classes.popover}
						{...args}
					>
						CES
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='end end'
						anchorAlignment='start start'
						className={classes.popover}
						{...args}
					>
						EE
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='end center'
						anchorAlignment='start center'
						className={classes.popover}
						{...args}
					>
						ESC
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='end start'
						anchorAlignment='start end'
						className={classes.popover}
						{...args}
					>
						ES
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='center start'
						anchorAlignment='center end'
						className={classes.popover}
						{...args}
					>
						CSE
					</Popover>
					*/}
				</div>
			</div>
		)
	}
}
