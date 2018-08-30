import React, { Component } from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'

import { notyError } from '../../../services/noty'

export default class MultiselectField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      disabled: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(tags, meta) {
    const { input: { value }, opts: { textField, onDeleteField, max } } = this.props

    const unionTags = _.unionBy(value, tags, textField)

    if (meta.action === "remove") {
      const dataValue = _.find(this.props.input.value, (v) => {
        return v[textField] === meta.dataItem[textField]
      })

      const newUnionTags = _.remove(value, (v) => {
        return v[textField] !== dataValue[textField]
      })

      if (onDeleteField) {
        this.setState({ disabled: true })

        this.props.opts.onDeleteField(dataValue, this.props.input.name, () => {
          this.props.input.onChange(newUnionTags)
          this.setState({ disabled: false })
        })
      } else {
        this.props.input.onChange(newUnionTags)
      }
    } else {
      if (!max || unionTags.length <= max) {
        this.props.input.onChange(unionTags)
      } else {
        notyError(`Can Only Select Maximum of ${max}`)
      }
    }
  }

  handleCreate(tag) {
    const { opts: { max } } = this.props
    const newTags = [...this.props.input.value, { [this.props.opts.textField]: tag }]
    if (!max || newTags.length <= max) {
      this.props.input.onChange(newTags)
    } else {
      notyError(`Can Only Select Maximum of ${max}`)
    }
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
        valueField, textField, TagItem,
        showErrors, validationHint
      }
    } = this.props

    const hasErrorClass = (showErrors || touched) && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { hint && <span className="help-block hint">{hint}</span> }
        { validationHint && <span className="help-block hint">{validationHint}</span>}

        <Multiselect
          disabled={this.state.disabled}
          containerClassName={`${label && "has-label"} ${input.value.length > 0 && "has-value"}`}
          allowCreate="onFilter"
          busy={requestInProcess}
          data={options}
          placeholder={placeholder}
          valueField={valueField}
          textField={textField}
          filter="contains"
          itemComponent={TagItem}
          tagComponent={TagItem}
          {...input}
          value={input.value || []}
          onChange={this.handleChange}
          onCreate={this.handleCreate}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />

        { label && <label className={input.value.length > 0 && 'has-value'} htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{(showErrors || touched) ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{(showErrors || touched) && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
