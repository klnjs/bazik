import type { ReactNode, ComponentProps } from 'react'

import classes from './Browser.module.css'

export type BrowserProps = ComponentProps<'li'> & {
	url: string
	children: ReactNode
}

export const Browser = ({
	children,
	url = 'http://localhost:3000'
}: BrowserProps) => (
	<div className={classes.browser}>
		<div className={classes['browser-header']}>
			<div className={classes['browser-buttons']}>
				<span
					className={classes['browser-dot']}
					style={{ background: '#f25f58' }}
				/>
				<span
					className={classes['browser-dot']}
					style={{ background: '#fbbe3c' }}
				/>
				<span
					className={classes['browser-dot']}
					style={{ background: '#58cb42' }}
				/>
			</div>
			<div className={classes['browser-address']}>{url}</div>
			<div className={classes['browser-menu']}>
				<div>
					<span className={classes['browser-bar']} />
					<span className={classes['browser-bar']} />
					<span className={classes['browser-bar']} />
				</div>
			</div>
		</div>

		<div className={classes['browser-body']}>{children}</div>
	</div>
)
