import React, { Component } from 'react'

export default class TextAreaField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label, decodeLabel,
        placeholder,
        hint
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        <textarea
          className="form-control"
          placeholder={placeholder}
          rows="3"
          {...input}
        />
        { hint && <span className="help-block">{hint}</span> }
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
      </div>
    )
  }
}
