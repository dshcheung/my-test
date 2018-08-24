import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class StaticField extends Component {
  render() {
    const {
      name, label, hint, fields, headerNoMargin, noMargin,
    } = this.props

    return (
      <div className={`clearfix static-field ${!noMargin && "margin-bottom-30"}`}>
        <div className={`field-header ${headerNoMargin && "margin-0"}`}>
          { label && <label htmlFor={name}>{label}</label> }
          { hint && <span className="help-block hint">{hint}</span>}
        </div>

        <div className="px-left-20 px-right-20 margin-0">
          {
            fields.map((f, i) => {
              if (f.injectTitle) {
                return (
                  <label className="margin-0" key={i} htmlFor={i}>{f.injectTitle}</label>
                )
              } else {
                return (
                  <Field
                    key={i}
                    {...f}
                    name={name ? `${name}.${f.name}` : f.name}
                  />
                )
              }
            })
          }
        </div>
      </div>
    )
  }
}

