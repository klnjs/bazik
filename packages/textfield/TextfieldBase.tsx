import { ComponentPropsWithRef, forwardRef, ReactElement } from 'react';
import clsx from 'clsx';

import * as classes from './TextfieldBase.css';

export type TextfieldBaseProps = Omit<
  ComponentPropsWithRef<'input'>,
  | 'type'
  | 'value'
  | 'max'
  | 'min'
  | 'checked'
  | 'defaultChecked'
  | 'aria-checked'
> & {
  type?: 'text' | 'email' | 'tel' | 'url' | 'password';
  value?: string;
  invalid?: boolean;
  inputProps?: { className?: string };
  adornmentEnd?: ReactElement;
};

export const TextfieldBase = forwardRef<HTMLInputElement, TextfieldBaseProps>(
  (
    {
      adornmentEnd,
      autoComplete,
      autoCorrect,
      autoFocus,
      className: classNameProp,
      defaultValue,
      disabled,
      id,
      inputMode,
      inputProps = {},
      invalid,
      maxLength,
      minLength,
      name,
      placeholder,
      readOnly,
      required,
      role,
      spellCheck,
      tabIndex,
      type = 'text',
      value,
      'aria-activedescendant': ariaActiveDescendant,
      'aria-autocomplete': ariaAutoComplete,
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-errormessage': ariaErrorMessage,
      'aria-expanded': ariaExpanded,
      'aria-invalid': ariaInvalid = invalid,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      onBlur,
      onChange,
      onClick,
      onCopy,
      onFocus,
      onKeyDown,
      onKeyUp,
      onPaste,
      ...otherProps
    }: TextfieldBaseProps,
    forwardedRef
  ) => {
    const inputClassName = clsx(
      inputProps.className,
      classes.textfieldBaseInput
    );

    const className = clsx(classNameProp, classes.textfieldBaseRoot, {
      invalid: invalid && !disabled,
      disabled,
    });

    return (
      <div className={className} {...otherProps}>
        {/* eslint-disable-next-line jsx-a11y/aria-activedescendant-has-tabindex */}
        <input
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          className={inputClassName}
          disabled={disabled}
          id={id}
          inputMode={inputMode}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={forwardedRef}
          required={required}
          role={role}
          spellCheck={spellCheck}
          tabIndex={tabIndex}
          type={type}
          value={value}
          aria-activedescendant={ariaActiveDescendant}
          aria-autocomplete={ariaAutoComplete}
          aria-controls={ariaControls}
          aria-describedby={ariaDescribedBy}
          aria-errormessage={ariaErrorMessage}
          aria-expanded={ariaExpanded}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onClick}
          onCopy={onCopy}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onPaste={onPaste}
        />
        {adornmentEnd}
      </div>
    );
  }
);
