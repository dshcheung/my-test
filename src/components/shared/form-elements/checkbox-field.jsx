import React, { Component } from 'react'

export default class CheckboxField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label, decodeLabel
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        <label htmlFor={input.name}>
          <input
            type="checkbox"
            name={input.name}
            onChange={input.onChange}
            checked={input.value}
          />
          { label && <span>{label}</span> }
          { decodeLabel && <span dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        </label>
        {
          hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
