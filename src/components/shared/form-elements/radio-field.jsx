import React, { Component } from 'react'

export default class RadioField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        options,
        label, decodeLabel,
        valueKey, nameKey,
        optItemClass,
        hint
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        { hint && <span className="help-block">{hint}</span> }
        {
          options.map((opt, i) => {
            let value = null
            let name = null

            if (typeof valueKey === "function") {
              value = valueKey(opt)
            } else {
              value = _.get(opt, valueKey)
            }

            if (typeof nameKey === "function") {
              name = nameKey(opt)
            } else {
              name = _.get(opt, nameKey)
            }

            return (
              <label key={i} className={`${optItemClass}`} htmlFor={input.name}>
                <input
                  type="radio"
                  name={input.name}
                  value={value}
                  onChange={input.onChange}
                  checked={input.value === value}
                />
                <span>{name}</span>
              </label>
            )
          })
        }
      </div>
    )
  }
}
