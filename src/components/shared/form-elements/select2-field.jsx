import React, { Component } from 'react'
import Select2 from 'react-select2-wrapper'

export default class SelectField extends Component {
  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        options, requestInProcess,
        label, decodeLabel,
        placeholder,
        valueKey, nameKey,
        hint, allowEmptyValue,
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    const data = []
    if (allowEmptyValue) {
      data.push({ id: "", text: "N/A" })
    }

    if (input.value) {
      const hasOption = _.find(options, (o) => { return o[valueKey] === input.value })
      if (!hasOption) {
        data.push({ id: input.value, text: input.value })
      }
    }

    options.forEach((o) => {
      data.push({
        id: _.get(o, valueKey),
        text: _.get(o, nameKey)
      })
    })

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}

        <Select2
          disabled={requestInProcess}
          {...input}
          data={data}
          options={{
            width: "100%",
            placeholder,
            tags: true,
            dropdownAutoWidth: true,
          }}
        />

        { hint && <span className="help-block">{hint}</span> }
        {
          hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
