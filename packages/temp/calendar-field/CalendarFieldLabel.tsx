import { poly, useId, type PolyProps } from '@klnjs/core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldLabelProps = PolyProps<'label'>

export const CalendarFieldLabel = 
	({ id: idProp, ...otherProps }: CalendarFieldLabelProps) => {
		const { highlightedSegmentRef, labelId, setLabelId } =
			useCalendarFieldContext()
			const id = useId(idProp, setLabelId)

		return (
			<poly.label
				id={id}
				onClick={() => highlightedSegmentRef.current?.focus()}
				{...otherProps}
			/>
		)
	}

