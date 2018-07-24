import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'

export default class SelectField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        options, requestInProcess,
        label,
        placeholder, optClass,
        valueKey, nameKey,
        hint, allowEmptyValue
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    let emptyValue = null

    if (allowEmptyValue) {
      emptyValue = { [valueKey]: "", [nameKey]: "N/A" }
    }

    const nOptions = emptyValue ? [emptyValue, ...options] : options

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { hint && <span className="help-block">{hint}</span> }
        <DropdownList
          containerClassName={`${label && "has-label"} ${input.value && "has-value"}`}
          busy={requestInProcess}
          data={nOptions}
          placeholder={placeholder}
          valueField={valueKey}
          textField={nameKey}
          {...input}
          onChange={(value) => { input.onChange(value[valueKey]) }}
        />
        { label && <label className={input.value && 'has-value'} htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
