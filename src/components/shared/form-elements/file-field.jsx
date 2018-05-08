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
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label, decodeLabel,
        optClass,
        hint,
        urlKey,
        templateUrl
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''
    const newInput = _.omit(input, 'value')
    const fileUrl = _.get(input.value, urlKey)

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={newInput.name + "-noInteraction"}>{label}</label>}
        { decodeLabel && <label htmlFor={newInput.name + "-noInteraction"} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        <input
          id={newInput.name}
          className="hide"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.csv"
          {...newInput}
        />
        <label
          htmlFor={newInput.name}
          className={`${optClass} file-field-label clearfix`}
        >
          {
            templateUrl && (
              <div className="clearfix">
                <a
                  href={templateUrl}
                  className="btn btn-info template-url"
                  download
                  target="_blank"
                >Download Template</a>
              </div>
            )
          }
          {
            !this.state.previewFileUrl && !fileUrl && (
              <div className="clearfix"><a className="btn btn-primary">Select File</a></div>
            )
          }
          {
            (this.state.previewFileUrl || fileUrl) && (
              <div className="clearfix">
                <a className="btn btn-warning">Select Replacement File</a>
                <a
                  href={this.state.previewFileUrl || fileUrl}
                  className="btn btn-primary"
                  download
                  target="_blank"
                >View File</a>
              </div>
            )
          }
          { hint && <span className="help-block clearfix">{hint}</span> }
          { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        </label>
      </div>
    )
  }
}
