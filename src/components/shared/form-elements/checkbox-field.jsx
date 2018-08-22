import React, { Component } from 'react'

export default class CheckboxField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label,
        hint
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group flex-column clearfix ${hasErrorClass}`}>
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        <label htmlFor={input.name}>
          <input
            type="checkbox"
            name={input.name}
            onChange={input.onChange}
            checked={input.value}
          />
          { label && <span className="margin-left-10">{label}</span> }
        </label>
        { hint && <span className="help-block hint">{hint}</span> }
      </div>
    )
  }
}
