import React, { Component } from 'react'
import { Field } from 'redux-form'

import CheckboxField from './form-elements/checkbox-field'
import DateTimePicker from './form-elements/datetime-picker'
import FileField from './form-elements/file-field'
import RadioField from './form-elements/radio-field'
import TextArea from './form-elements/text-area'
import TextField from './form-elements/text-field'

export default class DynamicQuestionnaires extends Component {
  render() {
    const { questions, getName, fileUrls } = this.props

    return (
      <div id="shared-dynamic-questionnaire">
        {
          questions.map((q, i) => {
            let component = null
            const name = getName(i)

            switch (q.type) {
              case "checkbox": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={CheckboxField}
                    opts={{
                      decodeLabel: q.title
                    }}
                  />
                )
                break
              }
              case "datetime": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={DateTimePicker}
                    opts={{
                      decodeLabel: q.title
                    }}
                  />
                )
                break
              }
              case "date": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={DateTimePicker}
                    opts={{
                      decodeLabel: q.title,
                      time: false,
                      format: "MMM D, YYYY"
                    }}
                  />
                )
                break
              }
              case "file": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={FileField}
                    opts={{
                      decodeLabel: q.title,
                      fileUrl: fileUrls[i]
                    }}
                  />
                )
                break
              }
              case "radio": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={RadioField}
                    opts={{
                      options: q.answers,
                      valueKey: (x) => {
                        return Object.keys(x)[0]
                      },
                      nameKey: (x) => {
                        return x[Object.keys(x)[0]]
                      },
                      decodeLabel: q.title,
                      optItemClass: "display-block"
                    }}
                  />
                )
                break
              }
              case "textarea": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={TextArea}
                    opts={{
                      type: q.type,
                      decodeLabel: q.title
                    }}
                  />
                )
                break
              }
              case "text": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={TextField}
                    opts={{
                      type: q.type,
                      decodeLabel: q.title
                    }}
                  />
                )
                break
              }
            }

            return component
          })
        }
      </div>
    )
  }
}
