import React, { Component } from 'react'

// Type - text || password
export default class TextField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        optClass,
        type,
        label, placeholder, hint,
        step, min,
        frontInputGroup, backInputGroup
      }
    } = this.props

    const inputGroup = backInputGroup || frontInputGroup

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        {
          inputGroup ? (
            <div className="input-group">
              <input
                className="form-control"
                placeholder={placeholder}
                type={type || "text"}
                step={step}
                min={min}
                {...input}
              />
              {
                backInputGroup && <span className="input-group-addon">{backInputGroup}</span>
              }
            </div>
          ) : (
            <input
              className="form-control"
              placeholder={placeholder}
              type={type || "text"}
              step={step}
              min={min}
              {...input}
            />
          )
        }
        { label && <label htmlFor={input.name}>{label} { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }</label> }
        { hint && <span className="help-block">{hint}</span> }
      </div>
    )
  }
}
