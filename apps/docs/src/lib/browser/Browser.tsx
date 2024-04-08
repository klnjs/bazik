import type { ReactNode, ComponentProps } from 'react'

import classes from './Browser.module.css'

export type BrowserProps = ComponentProps<'li'> & {
	url?: string
	children: ReactNode
}

export const Browser = ({
	children,
	url = 'http://localhost:3000'
}: BrowserProps) => (
	<div className={classes.browser}>
		<div className={classes.header}>
			<div className={classes.buttons}>
				<span
					className={classes.dot}
					style={{ background: '#f25f58' }}
				/>
				<span
					className={classes.dot}
					style={{ background: '#fbbe3c' }}
				/>
				<span
					className={classes.dot}
					style={{ background: '#58cb42' }}
				/>
			</div>
			<div className={classes.address}>{url}</div>
			<div className={classes.menu}>
				<div>
					<span className={classes.bar} />
					<span className={classes.bar} />
					<span className={classes.bar} />
				</div>
			</div>
		</div>

		<div className={classes.body}>{children}</div>
	</div>
)
