import React, { Component } from 'react'

export default class TextArea extends Component {
  render() {
    const { input, meta: { touched, invalid, error }, opts: { label, placeholder, noHelp } } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        <textarea
          className="form-control"
          placeholder={placeholder}
          rows="3"
          {...input}
        />
        {
          hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
