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
        options, requestInProcess,
        label,
        placeholder, optClass, hint,
        valueField, textField
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { hint && <span className="help-block hint">{hint}</span> }
        <Multiselect
          containerClassName={`${label && "has-label"} ${input.value && "has-value"}`}
          allowCreate={'onFilter'}
          busy={requestInProcess}
          data={options}
          placeholder={placeholder}
          valueField={valueField}
          textField={textField}
          {...input}
          value={input.value || []}
          onChange={this.handleChange}
          onCreate={this.handleCreate}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        { label && <label className={input.value.length < 0 && 'has-value'} htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
