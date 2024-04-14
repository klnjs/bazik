import { poly, forwardRef, useId, type CoreProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldLabelProps = CoreProps<'label'>

export const CalendarFieldLabel = forwardRef<'label', CalendarFieldLabelProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const { highlightedSegmentRef, labelId, setLabelId } =
			useCalendarFieldContext()
			const id = useIdAndCallback(idProp, setLabelId)

		return (
			<poly.label
				id={labelId}
				ref={forwardedRef}
				onClick={() => highlightedSegmentRef.current?.focus()}
				{...otherProps}
			/>
		)
	}
)
