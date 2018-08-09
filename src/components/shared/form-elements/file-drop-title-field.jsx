import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'

export default class FileDropTitleField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: null,
      searchTerm: ""
    }

    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onChange(option) {
    const title = option[this.props.opts.valueField]
    this.props.input.onChange(title)
    this.setState({ title })
  }

  onCreate(title) {
    this.props.input.onChange(title)
    this.setState({ title })
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
      input,
      collectionValues,
      opts: {
        requestInProcess, options,
        valueField, textField,
        placeholder, filter, allowCreate, uniq
      }
    } = this.props

    let nOptions = options

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
      <div className="file-drop-title-field">
        <DropdownList
          filter={filter}
          allowCreate={allowCreate && "onFilter"}
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
          onCreate={(text) => { this.onCreate(text) }}
          onChange={(value) => { this.onChange(value) }}
          onBlur={this.onBlur}
          onSearch={this.onSearch}
        />
      </div>
    )
  }
}
