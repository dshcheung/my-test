import React, { Component } from 'react'

export default class FileField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      previewFileUrl: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const fileList = nextProps.input.value

    if (fileList && fileList.length > 0 && this.props.input.value !== nextProps.input.value) {
      const file = _.get(fileList, '[0]', null)

      if (file) {
        this.setState({ previewFileUrl: URL.createObjectURL(file) })
      }
    }
  }

  render() {
    const { input, meta: { touched, invalid, error }, fileUrl, optClass, opts: {
      label, noHelp
    } } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''
    const newInput = _.omit(input, 'value')

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={newInput.name + "-noInteraction"}>{label}</label>}
        <input
          id={newInput.name}
          className="hide"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          {...newInput}
        />
        <label
          htmlFor={newInput.name}
          className={`${optClass} file-field-label`}
        >
          {
            !this.state.previewFileUrl && !fileUrl && (
              <div><a className="btn btn-primary">Select File</a></div>
            )
          }
          {
            (this.state.previewFileUrl || fileUrl) && (
              <div>
                <a className="btn btn-warning">Select Replacement File</a>
                <a
                  href={this.state.previewFileUrl || fileUrl}
                  className="btn btn-primary"
                  download
                >Download File</a>
              </div>
            )
          }
          {
            hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
          }
        </label>
      </div>
    )
  }
}
