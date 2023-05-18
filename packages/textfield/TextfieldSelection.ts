export type TextfieldSelectionDirection =
	| 'forward'
	| 'backward'
	| 'none'
	| undefined

export type TextfieldSelectionMove = { start?: number; end?: number } | number

export class TextfieldSelection {
	start: number = 0

	end: number = 0

	delta: number = 0

	direction?: 'forward' | 'backward' | 'none'

	constructor(
		start: number,
		end: number,
		direction: TextfieldSelectionDirection | null
	) {
		this.moveTo({ start, end })
		this.direction = direction ?? undefined
	}

	collapseToStart() {
		return this.moveTo(this.start)
	}

	collapseToEnd() {
		return this.moveTo(this.end)
	}

	moveTo(move: TextfieldSelectionMove) {
		if (isNumber(move)) {
			this.start = Math.max(move, 0)
			this.end = this.start
		} else {
			this.start = Math.max(0, move.start ?? this.start)
			this.end = Math.max(this.start, move.end ?? this.end)
			this.delta = this.start - this.end
		}

		return this
	}

	moveBy(delta: TextfieldSelectionMove) {
		if (isNumber(delta)) {
			this.start = Math.max(0, this.start + delta)
			this.end = Math.max(this.start, this.end + delta)
			this.delta = this.start - this.end
		} else {
			this.start = Math.max(0, this.start + (delta.start ?? 0))
			this.end = Math.max(this.start, delta.end ?? 0)
			this.delta = this.start - this.end
		}

		return this
	}

	isRange() {
		return this.delta !== 0
	}

	applyTo(element: HTMLInputElement) {
		element.setSelectionRange(this.start, this.end, this.direction)

		return this
	}

	static fromInput(element: HTMLInputElement) {
		const {
			selectionStart: start,
			selectionEnd: end,
			selectionDirection: direction
		} = element

		if (start !== null && end !== null) {
			return new TextfieldSelection(start, end, direction)
		}

		return undefined
	}
}

const isNumber = (move: any): move is number => Number.isFinite(move)
