import React, { Component } from 'react'

// Type - text || password
export default class TextField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        type,
        customLabel, label, decodeLabel,
        placeholder,
        hint
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { customLabel && label && customLabel(label, input.name) }
        { !customLabel && label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        <input
          className="form-control"
          placeholder={placeholder}
          type={type || "text"}
          {...input}
        />
        { hint && <span className="help-block">{hint}</span> }
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
      </div>
    )
  }
}
