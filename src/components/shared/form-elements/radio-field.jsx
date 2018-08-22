import React, { Component } from 'react'

export default class RadioField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        optClass, optItemClass,
        options, valueKey, nameKey,
        label, optionNameIsDangerous,
        hint, boldLabel
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group flex-column clearfix ${hasErrorClass} ${optClass}`}>
        { label && <label className={`${boldLabel && "fw-700"} margin-bottom-15`} htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
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
                { name && optionNameIsDangerous && <span className="margin-left-10" dangerouslySetInnerHTML={{ __html: name.decode() }} /> }
                { name && !optionNameIsDangerous && <span className="margin-left-10">{name}</span> }
              </label>
            )
          })
        }
        { hint && <span className="help-block hint">{hint}</span> }
      </div>
    )
  }
}
