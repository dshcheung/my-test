import React, { Component } from 'react'

export default class FileDropFileField extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.props.setPreviewUrl(_.get(this.props, 'input.value'))
  }

  onChange(file) {
    this.props.setPreviewUrl(file)
    this.props.input.onChange(file)
  }

  render() {
    const { input } = this.props

    return (
      <div className="file-drop-file-field">
        <label htmlFor={input.name}>{input.value.name || input.value.filename}</label>
        <input
          id={input.name}
          className="form-control hidden"
          type="file"
          {..._.omit(input, 'value')}
          onChange={(e) => { this.onChange(e.target.files[0]) }}
        />
      </div>
    )
  }
}
