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
        step, min, max, readOnly, overrideValue,
        frontInputGroup, backInputGroup,
        showErrors, validationHint
      }
    } = this.props

    const inputGroup = backInputGroup || frontInputGroup

    const hasErrorClass = (showErrors || touched) && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { hint && <span className="help-block hint">{hint}</span> }
        { validationHint && <span className="help-block hint">{validationHint}</span>}

        {
          inputGroup ? (
            <div className="input-group">
              <input
                className={`form-control ${label && 'has-label'}`}
                placeholder={placeholder || " "}
                type={type || "text"}
                step={step}
                min={min}
                max={max}
                readOnly={readOnly}
                {...input}
                value={overrideValue || input.value}
              />
              {
                backInputGroup && <span className="input-group-addon">{backInputGroup}</span>
              }
            </div>
          ) : (
            <input
              className={`form-control ${label && 'has-label'}`}
              placeholder={placeholder || " "}
              type={type || "text"}
              step={step}
              min={min}
              max={max}
              readOnly={readOnly}
              {...input}
              value={overrideValue || input.value}
            />
          )
        }

        { label && <label htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{(showErrors || touched) ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{(showErrors || touched) && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
