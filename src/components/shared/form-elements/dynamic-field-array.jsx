import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class DynamicFieldArray extends Component {
  constructor(props) {
    super(props)

    this.state = {
      disabled: false
    }
  }

  render() {
    const {
      fields, meta: { error },
      opts: {
        label, groupName,
        newFieldInit, onDeleteField,
        dynamicFields, hint, maxFields
      }
    } = this.props

    return (
      <div className="clearfix dynamic-field">
        <div className="field-header">
          <div className={error && "has-error"}>
            { label && <label htmlFor={fields.name}>{label} {error && <span className="help-block">{error}</span>}</label> }
            { !label && <span className="help-block">{error}&nbsp;</span> }
          </div>
          { hint && <span className="help-block hint">{hint}</span> }
        </div>
        {
          fields.map((objKey, i) => {
            return (
              <div key={i} className="margin-0">
                <div className="group-header clearfix">
                  <h5 className="group-name">{groupName} #{i + 1}</h5>
                  <button
                    disabled={this.state.disabled}
                    type="button"
                    className="btn btn-default delete pull-right"
                    onClick={() => {
                      this.setState({ disabled: true })
                      onDeleteField(fields.get(i), objKey, () => {
                        this.setState({ disabled: false })
                        fields.remove(i)
                      })
                    }}
                  ><i className="fa fa-trash-alt fa-rotate-35-on-hover" /></button>
                </div>

                {
                  dynamicFields.map((f, n) => {
                    return (
                      <Field
                        key={n}
                        name={`${objKey}.${f.key}`}
                        {...f}
                        collectionValues={this.props.fields.getAll().map((v) => {
                          return v[f.key]
                        })}
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
        {
          (!maxFields || fields.length < maxFields) && (
            <div className="text-center">
              <button
                type="button"
                className="btn btn-default btn-hover-border add"
                onClick={() => fields.push(newFieldInit)}
              ><i className="fa fa-plus" /> Add {groupName}</button>
            </div>
          )
        }
      </div>
    )
  }
}
