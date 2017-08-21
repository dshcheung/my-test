import React, { Component } from 'react'

// Type - text || password
export default class TextField extends Component {
  render() {
    const { input, meta: { touched, invalid, error }, customLabel, opts: { label, placeholder, noHelp, type } } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { customLabel && label && customLabel(label, input.name) }
        { !customLabel && label && <label htmlFor={input.name}>{label}</label> }
        <input
          className="form-control"
          placeholder={placeholder}
          type={type || "text"}
          {...input}
        />
        {
          hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
