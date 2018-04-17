import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class DynamicFieldArray extends Component {
  render() {
    const {
      fields, meta: { error },
      opts: {
        label, groupName,
        newFieldInit, onDeleteField,
        dynamicFields
      }
    } = this.props

    return (
      <div className="clearfix">
        <div className={`form-group clearfix ${error && "has-error"}`}>
          { label && <label htmlFor={fields.name}>{label}</label> }
          <button
            type="button"
            className="btn btn-info pull-right"
            onClick={() => fields.push(newFieldInit)}
          ><i className="fa fa-plus" /></button>
          { error && <span className="help-block">{error}</span> }
        </div>
        {
          fields.map((objKey, i) => {
            return (
              <div key={i} className="well">
                <div className="clearfix">
                  <h5 className="pull-left">{groupName} #{i + 1}</h5>
                  <button
                    type="button"
                    className="btn btn-danger pull-right"
                    onClick={() => { onDeleteField(i, fields, objKey, ) }}
                  ><i className="fa fa-trash" /></button>
                </div>

                {
                  dynamicFields.map((f, n) => {
                    return (
                      <Field key={n} name={`${objKey}.${f.key}`} {...f} />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
