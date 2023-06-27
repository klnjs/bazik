import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { splitProps } from '../core/splitProps'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldSegmentProps = AsChildComponentProps<
	'div',
	{ segment: 'year' | 'month' | 'day' }
>

export const CalendarFieldSegment = forwardRef<
	'div',
	CalendarFieldSegmentProps
>((props, forwardedRef) => {
	const context = useCalendarFieldContext()
	const [localProps, componentProps] = splitProps(props, ['segment'])
	const segmentProps = context[`${localProps.segment}Props`]
	const mergedProps = mergeProps(componentProps, segmentProps)

	return <freya.div ref={forwardedRef} {...mergedProps} />
})
