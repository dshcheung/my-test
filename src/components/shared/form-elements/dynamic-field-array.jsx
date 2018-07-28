import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class DynamicFieldArray extends Component {
  render() {
    const {
      fields, meta: { error },
      opts: {
        label, groupName,
        newFieldInit, onDeleteField,
        dynamicFields, hint
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
                    type="button"
                    className="btn btn-default delete pull-right"
                    onClick={() => { onDeleteField(i, fields, objKey) }}
                  ><i className="fa fa-trash-alt fa-rotate-35-on-hover" /></button>
                </div>

                {
                  dynamicFields.map((f, n) => {
                    return (
                      <Field
                        key={n}
                        name={`${objKey}.${f.key}`}
                        {...f}
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
        <div className="text-center">
          <button
            type="button"
            className="btn btn-default btn-hover-border add"
            onClick={() => fields.push(newFieldInit)}
          ><i className="fa fa-plus" /> Add {groupName}</button>
        </div>
      </div>
    )
  }
}
