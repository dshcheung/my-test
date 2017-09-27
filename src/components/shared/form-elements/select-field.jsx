import React, { Component } from 'react'

export default class SelectField extends Component {
  render() {
    const { input, meta: { touched, invalid, error }, options, requestInProcess, multiple, opts: { label, placeholder, noHelp } } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        <select
          className="form-control"
          disabled={requestInProcess}
          multiple={multiple}
          {...input}
        >
          <option value="" disabled>{ requestInProcess ? "Loading" : placeholder }</option>
          {
            options.map((opt) => {
              return <option key={opt.id} value={opt.id}>{opt.name}</option>
            })
          }
        </select>
        {
          hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
