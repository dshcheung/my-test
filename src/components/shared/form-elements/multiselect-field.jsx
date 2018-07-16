import React, { Component } from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'

export default class MultiselectField extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(tags) {
    this.props.input.onChange(tags)
  }

  handleCreate(tag) {
    const newTags = [...this.props.input.value, { [this.props.opts.textField]: tag }]
    this.props.input.onChange(newTags)
  }

  handleBlur() {
    this.props.input.onBlur(this.props.input.value)
  }

  handleFocus() {
    this.props.input.onFocus(this.props.input.value)
  }

  render() {
    const {
      input, meta: { invalid, error, touched },
      opts: {
        label, decodeLabel,
        placeholder, hint, optClass,
        options, valueField, textField
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        { hint && <span className="help-block">{hint}</span> }
        <Multiselect
          {...input}
          onChange={this.handleChange}
          onCreate={this.handleCreate}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          placeholder={placeholder}
          allowCreate={'onFilter'}
          data={options}
          valueField={valueField}
          textField={textField}
        />
      </div>
    )
  }
}
