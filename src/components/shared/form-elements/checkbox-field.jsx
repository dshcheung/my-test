import React, { Component } from 'react'

export default class CheckboxField extends Component {
  render() {
    const { input, meta: { touched, invalid, error }, opts: { label }, noHelp } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        <input
          type="checkbox"
          name={input.name}
          onChange={input.onChange}
          checked={input.value}
        />
        { label && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: label.decode() }} /> }
        {
          hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
