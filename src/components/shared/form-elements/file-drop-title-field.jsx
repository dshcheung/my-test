import React, { Component } from 'react'
import { DropdownList } from 'react-widgets'

export default class FileDropTitleField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: null
    }

    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
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

  render() {
    const {
      input,
      opts: {
        requestInProcess, options,
        valueField, textField,
        placeholder, filter, allowCreate
      }
    } = this.props

    return (
      <div className="file-drop-title-field">
        <DropdownList
          filter={filter}
          allowCreate={allowCreate && "onFilter"}
          busy={requestInProcess}
          data={options}
          placeholder={placeholder}
          valueField={valueField}
          textField={textField}
          {...input}
          onCreate={(text) => { this.onCreate(text) }}
          onChange={(value) => { this.onChange(value) }}
        />
      </div>
    )
  }
}
