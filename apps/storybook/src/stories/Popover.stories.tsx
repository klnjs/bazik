import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Select, Story, Switch, TextField } from '../src/lib'
import { Popover } from '../../packages/popover/src/Popover'
import { PopoverAnchor } from '../../packages/popover/src/PopoverAnchor'
import { PopoverTrigger } from '../../packages/popover/src/PopoverTrigger'
import { PopoverContent } from '../../packages/popover/src/PopoverContent'
import type { PopoverPlacement } from '../../packages/popover/src/PopoverTypes'
import * as classes from './Popover.stories.css'

export default {
	title: 'Popover',
	component: Popover
} satisfies Meta<typeof Popover>

export const Behaviour = () => {
	const [open, setOpen] = useState(false)
	const [modal, setModal] = useState(false)

	return (
		<Story
			controls={[
				<Switch label="modal" checked={modal} onChange={setModal} />
			]}
		>
			<Popover open={open} modal={modal} onOpenChange={setOpen}>
				<PopoverTrigger className={classes.trigger}>
					{open ? 'Close' : 'Open'}
				</PopoverTrigger>
				<PopoverContent className={classes.popover}>
					Popover
				</PopoverContent>
			</Popover>
		</Story>
	)
}

export const Placement = () => {
	const [offset, setOffset] = useState('2')
	const [placement, setPlacement] = useState<PopoverPlacement>('top')

	const placements: PopoverPlacement[] = [
		'top',
		'top-start',
		'top-end',
		'right',
		'right-start',
		'right-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'left',
		'left-start',
		'left-end'
	]

	const placementOptions = placements.map((value) => ({ value }))

	return (
		<Story
			controls={[
				<Select
					label="Placement"
					value={placement}
					options={placementOptions}
					onChange={setPlacement}
				/>,
				<TextField label="Offset" value={offset} onChange={setOffset} />
			]}
		>
			<Popover open placement={placement} offset={Number(offset)}>
				<PopoverAnchor className={classes.anchor}>Anchor</PopoverAnchor>
				<PopoverContent className={classes.popover}>
					Popover
				</PopoverContent>
			</Popover>
		</Story>
	)
}

export const Dismissing = () => {
	const [open, setOpen] = useState(false)
	const [onFocusOut, setOnFocusOut] = useState(true)
	const [onEscapeKey, setOnEscapeKey] = useState(true)
	const [onPressOutside, setOnPressOutside] = useState(true)
	const [onAncestorScroll, setOnAncestorScroll] = useState(false)

	return (
		<Story
			controls={[
				<Switch
					label="onFocusOut"
					checked={onFocusOut}
					onChange={setOnFocusOut}
				/>,
				<Switch
					label="onEscapeKey"
					checked={onEscapeKey}
					onChange={setOnEscapeKey}
				/>,
				<Switch
					label="onPressOutside"
					checked={onPressOutside}
					onChange={setOnPressOutside}
				/>,
				<Switch
					label="onAncestorScroll"
					checked={onAncestorScroll}
					onChange={setOnAncestorScroll}
				/>
			]}
		>
			<Popover
				open={open}
				dismiss={{
					onFocusOut,
					onEscapeKey,
					onPressOutside,
					onAncestorScroll
				}}
				onOpenChange={setOpen}
			>
				<PopoverTrigger className={classes.trigger}>
					{open ? 'Close' : 'Open'}
				</PopoverTrigger>
				<PopoverContent className={classes.popover}>
					Popover
				</PopoverContent>
			</Popover>
		</Story>
	)
}

export const Transitions = () => {
	const [enter, setEnter] = useState('1000')
	const [leave, setLeave] = useState('1000')

	return (
		<Story
			controls={[
				<TextField label="Enter" value={enter} onChange={setEnter} />,
				<TextField label="Leave" value={leave} onChange={setLeave} />
			]}
		>
			<Popover duration={{ enter: Number(enter), leave: Number(leave) }}>
				<PopoverTrigger className={classes.anchor}>Open</PopoverTrigger>
				<PopoverContent
					className={classes.popoverWithTransition}
					style={assignInlineVars({
						[classes.popoverEnterDuration]: `${enter}ms`,
						[classes.popoverLeaveDuration]: `${leave}ms`
					})}
				>
					I am a popover
				</PopoverContent>
			</Popover>
		</Story>
	)
}
