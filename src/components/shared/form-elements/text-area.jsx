import React, { Component } from 'react'

export default class TextArea extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label,
        placeholder,
        hint,
        showErrors, validationHint
      }
    } = this.props

    const hasErrorClass = (showErrors || touched) && invalid ? 'has-error' : ''

    return (
      <div className={`form-group flex-column clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{(showErrors || touched) ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{(showErrors || touched) && hasErrorClass && error.join(", ")}&nbsp;</span>}
        { validationHint && <span className="help-block hint">{validationHint}</span>}
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
