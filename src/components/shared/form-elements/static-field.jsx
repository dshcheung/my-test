import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class StaticField extends Component {
  render() {
    const {
      name, label, hint, fields
    } = this.props

    return (
      <div className="clearfix static-field margin-bottom-30">
        <div className="field-header">
          { label && <label htmlFor={name}>{label}</label> }
          { hint && <span className="help-block hint">{hint}</span>}
        </div>

        <div className="margin-0">
          {
            fields.map((f, i) => {
              return (
                <Field
                  key={i}
                  {...f}
                  name={`${name}.${f.name}`}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

