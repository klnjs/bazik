import { type ComponentPropsWithRef, forwardRef } from 'react'
import clsx from 'clsx'
import * as classes from './RadioBase.css'

export type RadioBaseProps = Omit<
	ComponentPropsWithRef<'input'>,
	| 'autoComplete'
	| 'autoCorrect'
	| 'defaultValue'
	| 'inputMode'
	| 'max'
	| 'maxLength'
	| 'min'
	| 'minLength'
	| 'placeholder'
	| 'spellCheck'
	| 'type'
> & {
	invalid?: boolean
}

export const RadioBase = forwardRef<HTMLInputElement, RadioBaseProps>(
	function RadioBase(
		{
			checked,
			className: classNameProp,
			disabled,
			id,
			invalid,
			name,
			readOnly,
			required,
			role,
			tabIndex,
			value,
			onBlur,
			onChange,
			onClick,
			onFocus,
			...otherProps
		},
		forwardedRef
	) {
		const className = clsx(classNameProp, classes.radioBaseRoot, {
			invalid: invalid && !disabled,
			disabled
		})

		return (
			<div className={className} {...otherProps}>
				<input
					checked={checked}
					className={classes.radioBaseInput}
					disabled={disabled}
					id={id}
					name={name}
					readOnly={readOnly}
					ref={forwardedRef}
					required={required}
					role={role}
					tabIndex={tabIndex}
					type='radio'
					aria-invalid={invalid}
					onBlur={onBlur}
					onChange={onChange}
					onClick={onClick}
					onFocus={onFocus}
				/>
				<div className={classes.radioBaseCircle} />
			</div>
		)
	}
)
