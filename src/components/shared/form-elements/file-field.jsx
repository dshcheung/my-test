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
        label,
        optClass,
        hint,
        urlKey, valueIsUrl,
        templateUrl
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''
    const newInput = _.omit(input, 'value')
    const fileUrl = valueIsUrl ? input.value : _.get(input.value, urlKey)

    let fileName = ''

    if (this.state.previewFileUrl) {
      fileName = input.value && input.value[0] && input.value[0].name
    } else if (fileUrl) {
      fileName = fileUrl.split('/').reverse()[0]
    }

    const hasValue = this.state.previewFileUrl || fileUrl

    return (
      <div className={`form-group clearfix ${hasErrorClass} file-field`}>
        {
          (hint || templateUrl) && (
            <span className="help-block hint clearfix">
              { templateUrl && <a href={templateUrl} download target="_blank" rel="noopener noreferrer">Download Template</a> }
              {hint}
            </span>
          )
        }

        <div className={`file-field-content ${label && "has-label"}`}>
          <input
            id={newInput.name}
            className="hide"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.csv,.xsl,.xslx"
            {...newInput}
          />
          <label
            htmlFor={newInput.name}
            className={`${optClass} file-field-label clearfix`}
          >
            <div className="form-control">{fileName}</div>
            {
              !this.state.previewFileUrl && !fileUrl && (
                <a className="btn btn-default border-none"><i className="fa fa-upload" /></a>
              )
            }
            {
              (this.state.previewFileUrl || fileUrl) && (
                <a className="btn btn-default border-none"><i className="fa fa-redo" /></a>
              )
            }
            {
              (this.state.previewFileUrl || fileUrl) && (
                <a
                  href={this.state.previewFileUrl || fileUrl}
                  className="btn btn-default border-none"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                ><i className="fa fa-eye" /></a>
              )
            }
          </label>
        </div>
        {
          label && (
            <label
              className={hasValue && "has-value"}
              htmlFor={newInput.name + "-noInteraction"}
            >
              {label}
              {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>}
            </label>
          )
        }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
