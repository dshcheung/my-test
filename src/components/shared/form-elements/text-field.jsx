import React, { Component } from 'react'

// Type - text || password
export default class TextField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        optClass,
        type,
        customLabel, label, decodeLabel,
        placeholder,
        hint,
        step, min,
        inputGroup, backInputGroup
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { customLabel && label && customLabel(label, input.name) }
        { !customLabel && label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        { hint && <span className="help-block">{hint}</span> }
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
      </div>
    )
  }
}
