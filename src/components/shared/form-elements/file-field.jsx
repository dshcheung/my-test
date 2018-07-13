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

    return (
      <div className={`form-group clearfix ${hasErrorClass} file-field`}>
        { label && <label htmlFor={newInput.name + "-noInteraction"}>{label}</label>}
        { decodeLabel && <label htmlFor={newInput.name + "-noInteraction"} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        { hint && <span className="help-block clearfix">{hint}</span> }
        {
          templateUrl && (
            <a
              href={templateUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
            >Download Template</a>
          )
        }
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
          <div className="input-group">
            <input type="text" className="form-control" value={fileName} disabled />
            {
              !this.state.previewFileUrl && !fileUrl && (
                <div className="input-group-btn">
                  <a className="btn btn-primary"><i className="fa fa-upload" /></a>
                </div>
              )
            }
            {
              (this.state.previewFileUrl || fileUrl) && (
                <div className="input-group-btn">
                  <a className="btn btn-warning"><i className="fa fa-redo" /></a>
                </div>
              )
            }
            {
              (this.state.previewFileUrl || fileUrl) && (
                <div className="input-group-btn">
                  <a
                    href={this.state.previewFileUrl || fileUrl}
                    className="btn btn-primary"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  ><i className="fa fa-eye" /></a>
                </div>
              )
            }
          </div>
        </label>
      </div>
    )
  }
}
