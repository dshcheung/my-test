import React, { Component } from 'react'

export default class RadioField extends Component {
  render() {
    const { input, meta: { touched, invalid, error }, opts, optItemClass, noHelp } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        {
          opts.map((opt, i) => {
            return (
              <label key={i} className={`${optItemClass}`} htmlFor={input.name}>
                <span>{opt.label} </span>
                <input
                  type="radio"
                  name={input.name}
                  value={opt.value}
                  onChange={input.onChange}
                  checked={input.value === opt.value}
                />
              </label>
            )
          })
        }
        {
          hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
