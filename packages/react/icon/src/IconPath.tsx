import type { CoreProps } from '@klnjs/core'
import type { ComponentProps } from 'react'

export type IconPathProps = CoreProps<'path'>

export const IconPath = ({ ref, ...otherProps }: ComponentProps<'path'>) => (
	<path ref={ref} {...otherProps} />
)
