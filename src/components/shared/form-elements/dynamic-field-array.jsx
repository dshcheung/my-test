import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class DynamicFieldArray extends Component {
  componentWillMount() {
    if (this.props.opts.staticGroup) {
      this.props.fields.push(this.props.opts.newFieldInit)
    }
  }

  render() {
    const {
      fields, meta: { error },
      opts: {
        label, groupName,
        newFieldInit, onDeleteField,
        dynamicFields, hint, staticGroup
      }
    } = this.props

    return (
      <div className="clearfix margin-bottom-20 dynamic-field">
        <div className={`form-group clearfix ${error && "has-error"} margin-0`}>
          { label && <label htmlFor={fields.name}>{label}</label> }
          { error && <span className="help-block">{error}</span> }
        </div>
        { hint && <span className="help-block clearfix margin-bottom-5">{hint}</span> }
        {
          fields.map((objKey, i) => {
            return (
              <div key={i} className="well margin-0">
                <div className="clearfix">
                  {
                    !staticGroup && <h5 className="pull-left">{groupName} #{i + 1}</h5>
                  }
                  {
                    !staticGroup && (
                      <button
                        type="button"
                        className="btn btn-danger pull-right"
                        onClick={() => { onDeleteField(i, fields, objKey) }}
                      ><i className="fa fa-trash" /></button>
                    )
                  }
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
        {
          !staticGroup && (
            <button
              type="button"
              className="btn btn-info btn-block"
              onClick={() => fields.push(newFieldInit)}
            ><i className="fa fa-plus" /> Add Another</button>
          )
        }
      </div>
    )
  }
}
