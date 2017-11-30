import React, { Component } from 'react'

export default class RadioField extends Component {
  render() {
    const { input, meta: { pristine, invalid, error }, opts, optItemClass, noHelp } = this.props

    const hasErrorClass = !pristine && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        {
          opts.map((opt, i) => {
            return (
              <label key={i} className={`${optItemClass}`} htmlFor={input.name}>
                <input
                  type="radio"
                  name={input.name}
                  value={opt.value}
                  onChange={input.onChange}
                  checked={input.value === opt.value}
                />
                <span>{opt.label} </span>
              </label>
            )
          })
        }
        {
          hasErrorClass && !noHelp && <span className="help-block">{!pristine ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
