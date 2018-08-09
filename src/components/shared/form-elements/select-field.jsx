import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'

export default class SelectField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ""
    }

    this.onBlur = this.onBlur.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onBlur() {
    this.setState({ searchTerm: "" })
    this.props.input.onBlur()
  }

  onSearch(searchTerm) {
    this.setState({ searchTerm })
  }

  render() {
    const {
      input, meta: { touched, invalid, error },
      collectionValues,
      opts: {
        options, requestInProcess,
        label,
        placeholder, optClass, hint,
        valueField, textField,
        filter, allowCreate,
        allowEmptyValue, uniq
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    let nOptions = options

    if (allowEmptyValue) {
      const emptyValue = { [valueField]: "", [textField]: "" }
      nOptions = [emptyValue, ...options]
    }

    if (uniq && collectionValues.length > 0) {
      nOptions = _.filter(nOptions, (o) => {
        const showSelfValue = o[valueField] === input.value
        const valueInUse = _.findIndex(collectionValues, (cv) => {
          return cv === o[valueField]
        }) >= 0

        return showSelfValue || !valueInUse
      })
    }

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { hint && <span className="help-block hint">{hint}</span> }
        <DropdownList
          filter={filter}
          allowCreate={allowCreate && "onFilter"}
          containerClassName={`${label && "has-label"} ${input.value && "has-value"}`}
          busy={requestInProcess}
          data={nOptions}
          placeholder={placeholder}
          valueField={valueField}
          textField={textField}
          searchTerm={this.state.searchTerm}
          messages={{
            filterPlaceholder: allowCreate ? "Type to Filter or Create / Select One" : "Type to Filter / Select One"
          }}
          {...input}
          onCreate={(text) => { input.onChange(text) }}
          onChange={(value) => { input.onChange(value[valueField]) }}
          onBlur={this.onBlur}
          onSearch={this.onSearch}
        />
        { label && <label className={input.value && 'has-value'} htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
