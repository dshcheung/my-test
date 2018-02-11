import React, { Component } from 'react'

export default class SelectField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        options, requestInProcess,
        label, decodeLabel,
        placeholder,
        valueKey, nameKey
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        <select
          className="form-control"
          disabled={requestInProcess}
          {...input}
        >
          <option value="" disabled>{ requestInProcess ? "Loading" : placeholder }</option>
          {
            options.map((opt) => {
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
                <option
                  key={value}
                  value={value}
                >{name}</option>
              )
            })
          }
        </select>
        {
          hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
