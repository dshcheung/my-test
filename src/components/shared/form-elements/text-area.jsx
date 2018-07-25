import React, { Component } from 'react'

export default class TextAreaField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label,
        placeholder,
        hint
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group flex-column clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
        { hint && <span className="help-block hint">{hint}</span> }
        <textarea
          className="form-control"
          placeholder={placeholder}
          rows="2"
          {...input}
        />
      </div>
    )
  }
}
