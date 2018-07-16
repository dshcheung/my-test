import React, { Component } from 'react'

export default class SelectField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        options, requestInProcess,
        label, decodeLabel,
        placeholder, optClass,
        valueKey, nameKey,
        hint, allowEmptyValue,
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        { hint && <span className="help-block">{hint}</span> }
        <select
          className="form-control"
          disabled={requestInProcess}
          {...input}
        >
          {
            requestInProcess && (
              <option value="" disabled>{ requestInProcess && "Loading" }</option>
            )
          }

          {
            placeholder && (
              <option value="" disabled>{ placeholder }</option>
            )
          }

          {
            allowEmptyValue && (
              <option value="">N/A</option>
            )
          }

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
      </div>
    )
  }
}
