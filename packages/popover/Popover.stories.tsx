import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Popover } from './Popover'
import * as classes from './Popover.stories.css'

export default {
	title: 'Popover',
	component: Popover,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof Popover>

export const Default: StoryObj<typeof Popover> = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [anchorLTR, setAnchorLTR] = useState<HTMLElement>()

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [anchorRTL, setAnchorRTL] = useState<HTMLElement>()

		return (
			<div
				style={{
					display: 'grid',
					gridGap: 32,
					gridTemplateColumns: '1fr 1fr',
					justifyItems: 'center'
				}}
			>
				<div dir='ltr'>
					<button
						onClick={({ target }) =>
							setAnchorLTR((prev) =>
								prev ? undefined : (target as HTMLElement)
							)
						}
					>
						Open
					</button>

					<Popover
						open={Boolean(anchorLTR)}
						anchor={anchorLTR}
						anchorOrigin='start start'
						anchorAlignment='end end'
						className={classes.popover}
						{...args}
					>
						SS
					</Popover>

					<Popover
						open={Boolean(anchorLTR)}
						anchor={anchorLTR}
						anchorOrigin='start end'
						anchorAlignment='end start'
						className={classes.popover}
						{...args}
					>
						SE
					</Popover>

					<Popover
						open={Boolean(anchorLTR)}
						anchor={anchorLTR}
						anchorOrigin='end end'
						anchorAlignment='start start'
						className={classes.popover}
						{...args}
					>
						EE
					</Popover>

					<Popover
						open={Boolean(anchorLTR)}
						anchor={anchorLTR}
						anchorOrigin='end start'
						anchorAlignment='start end'
						className={classes.popover}
						{...args}
					>
						ES
					</Popover>
				</div>

				<div dir='rtl'>
					<button
						onClick={({ target }) =>
							setAnchorRTL((prev) =>
								prev ? undefined : (target as HTMLElement)
							)
						}
					>
						Open
					</button>

					<Popover
						open={Boolean(anchorRTL)}
						anchor={anchorRTL}
						anchorOrigin='start start'
						anchorAlignment='end end'
						className={classes.popover}
						{...args}
					>
						SS
					</Popover>
					{/*
						<Popover
							open={Boolean(anchorRTL)}
							anchor={anchorRTL}
							anchorOrigin='start end'
							anchorAlignment='end start'
							className={classes.popover}
							{...args}
						>
							SE
						</Popover>

						<Popover
							open={Boolean(anchorRTL)}
							anchor={anchorRTL}
							anchorOrigin='end end'
							anchorAlignment='start start'
							className={classes.popover}
							{...args}
						>
							EE
						</Popover>

						<Popover
							open={Boolean(anchorRTL)}
							anchor={anchorRTL}
							anchorOrigin='end start'
							anchorAlignment='start end'
							className={classes.popover}
							{...args}
						>
							ES
						</Popover>
					*/}
				</div>
			</div>
		)
	}
}
