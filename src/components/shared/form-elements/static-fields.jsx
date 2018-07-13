import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class StaticFields extends Component {
  render() {
    const {
      name, label, hint, fields
    } = this.props

    return (
      <div className="clearfix margin-bottom-20 static-fields">
        { label && <label htmlFor={name}>{label}</label> }
        { hint && <span className="help-block clearfix margin-bottom-5">{hint}</span>}

        <div className="well margin-0">
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

