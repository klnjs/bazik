import { useMemo, useState, type MouseEvent } from 'react'
import { Story, TextField } from '../../.storybook/src/lib'
import { useDebounce } from '../core/useDebounce'
import * as icons from './index'
import * as classes from './Icons.stories.css'

export default {
	title: 'Icons'
}

export const Collection = () => {
	const [query, setQuery] = useState('')
	const queryDebounced = useDebounce(query, 200)

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		const button = event.target as HTMLButtonElement
		const source = button.querySelector('svg')?.outerHTML ?? ''

		await navigator.clipboard.writeText(source)
	}

	const iconsQueryResult = useMemo(() => {
		if (queryDebounced) {
			return Object.entries(icons).filter(([name]) =>
				name
					.toLocaleLowerCase()
					.includes(queryDebounced.toLocaleLowerCase())
			)
		}

		return Object.entries(icons).slice(0, 20)
	}, [queryDebounced])

	return (
		<Story
			width={640}
			height={385}
			center={false}
			direction="column"
			controls={[
				<TextField
					label="Search"
					placeholder="Find by name..."
					value={query}
					onChange={setQuery}
				/>
			]}
		>
			<div className={classes.grid}>
				{iconsQueryResult.map(([name, Icon]) => (
					<button
						className={classes.button}
						aria-label={`Copy icon ${name} to clipboard`}
						onClick={handleClick}
					>
						<Icon className={classes.icon} />
					</button>
				))}
			</div>
		</Story>
	)
}
