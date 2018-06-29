import React, { Component } from 'react'
import Combobox from 'react-widgets/lib/Combobox'

export default class AutocompleteField extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  handleChange(data) {
    if (typeof data === "string") {
      this.props.search(data)
      this.props.input.onChange({ name: data, id: null })
    }
  }

  handleSelect(data) {
    this.props.input.onChange(data)
  }

  handleOnBlur() {
    this.props.input.onBlur()
  }

  render() {
    const { input, meta: { invalid, error, touched }, opts: {
      label, noHelp, inProcess, options, valueField, textField
    } } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        {
          hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }

        <Combobox
          {...input}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onBlur={this.handleOnBlur}
          busy={inProcess}
          data={options}
          valueField={valueField}
          textField={textField}
        />
      </div>
    )
  }
}
