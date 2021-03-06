import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

import { getType, openLink } from '../../../services/utils'

import FileDropFileField from './file-drop-file-field'
import FileDropTitleField from './file-drop-title-field'

const mapStateToProps = (state, props) => {
  return {
    formData: _.get(state, `form[${props.meta.form}]`)
  }
}

@connect(mapStateToProps, null)
export default class FileDropField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      attachments: [],
      disabled: false,
      previews: {}
    }

    this.onDrop = this.onDrop.bind(this)
  }

  componentWillMount() {
    if (this.props.initialFields) {
      this.props.initialFields(this.props.fields)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fields.length > nextProps.fields.length) {
      nextProps.fields.forEach((objKey, i) => {
        this.setPreviewUrl(_.get(nextProps.fields.get(i), 'file', null), objKey)
      })
    }
  }

  onDrop(newFiles) {
    const formattedNewFiles = newFiles.map((f) => {
      return {
        title: "",
        file: f
      }
    })

    const { fields, opts: { selectOpts: { options, valueField }, autoPickOption } } = this.props

    formattedNewFiles.forEach((f, i) => {
      if (autoPickOption) {
        const nextOption = options[i][valueField]
        fields.push({ ...f, title: nextOption })
      } else {
        fields.push(f)
      }
    })
  }

  setPreviewUrl(file, objKey) {
    const type = getType(file)

    let fileUrl = null

    if (file && type === "File") {
      fileUrl = URL.createObjectURL(file)
    } else if (file && type === "Object") {
      fileUrl = _.get(file, 'original')
    }

    if (fileUrl) this.setState({ [objKey]: fileUrl })
  }

  render() {
    const {
      fields, formData, meta: { error },
      opts: {
        optClass, onDeleteField,
        selectOpts, maxFields, showErrors
      }
    } = this.props

    const errors = _.get(formData.syncErrors, fields.name, [])
    const meta = _.get(formData.fields, fields.name, [])

    return (
      <div className={`file-drop-field form-group flex-column clearfix ${optClass}`}>
        <Dropzone
          className="drop-zone"
          onDrop={this.onDrop}
          maxSize={5000000}
          disabled={fields.length >= maxFields}
        >
          <div className="row">
            <div className="col-xs-12 text-center margin-top-50">
              <div className={error && "has-error"}>
                {
                  (!maxFields || fields.length < maxFields) ? (
                    <div>
                      <span className="dp-ib px-10 bg-primary text-uppercase">drag</span> N' <span className="dp-ib px-10 bg-dark text-uppercase">drop</span>
                      <div>
                        <strong>Drag and drop or click here</strong>
                        <p>to upload your files (max 5MB) {maxFields && `(max ${maxFields} files)`}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <strong>Maximum File Reached</strong>
                    </div>
                  )
                }
                <span className="help-block">{error}</span>
              </div>
            </div>
          </div>
        </Dropzone>

        {
          fields.length > 0 && (
            <ul className="file-list">
              {
                fields.map((objKey, i) => {
                  const thisMeta = _.get(meta, `[${i}]`, {})
                  const thisError = _.get(errors, `[${i}]`, {})
                  const touched = thisMeta.title || thisMeta.file
                  const invalid = thisError.title || thisError.file
                  const titleErrors = (thisError.title || []).map((e) => {
                    return `Title: ${e}`
                  })
                  const fileErrors = (thisError.file || []).map((e) => {
                    return `File: ${e}`
                  })

                  const combinedErrors = [...titleErrors, ...fileErrors]

                  const hasErrorClass = (showErrors || touched) && invalid && 'has-error'

                  const fileUrl = _.get(this.state, `${objKey}`, '')

                  return (
                    <li key={i} className={`file-item-wrapper ${hasErrorClass}`}>
                      <span className="help-block">{(showErrors || touched) && hasErrorClass && combinedErrors.join(', ')}&nbsp;</span>
                      <div className="file-item">
                        <Field
                          name={`${objKey}.file`}
                          component={FileDropFileField}
                          setPreviewUrl={(file) => {
                            this.setPreviewUrl(file, objKey)
                          }}
                        />
                        <Field
                          name={`${objKey}.title`}
                          component={FileDropTitleField}
                          opts={selectOpts}
                          collectionValues={this.props.fields.getAll().map((v) => {
                            return v.title
                          })}
                        />
                        {
                          fileUrl && (
                            <div className="preview">
                              <button
                                type="button"
                                className="btn btn-default pull-right border-none"
                                onClick={() => {
                                  openLink(fileUrl)
                                }}
                              ><i className="fa fa-eye" /></button>
                            </div>
                          )
                        }
                        <div className="delete">
                          <button
                            type="button"
                            disabled={this.state.disabled}
                            className="btn btn-default"
                            onClick={() => {
                              this.setState({ disabled: true })
                              onDeleteField(fields.get(i), objKey, () => {
                                this.setState({ disabled: false })
                                fields.remove(i)
                              })
                            }}
                          ><i className="ahub-trash text-danger" /></button>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    )
  }
}
