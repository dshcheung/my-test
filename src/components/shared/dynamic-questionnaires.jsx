import React, { Component } from 'react'
import { Field } from 'redux-form'

import RadioField from './form-elements/radio-field'
import TextField from './form-elements/text-field'
import CheckboxField from './form-elements/checkbox-field'
import DateTimePickerField from './form-elements/datetime-picker'
import FileField from './form-elements/file-field'

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
              case "radio": {
                component = (
                  <Field
                    key={i}
                    optItemClass="display-block"
                    name={name}
                    component={RadioField}
                    title={q.title}
                    opts={q.answers.map((answer) => {
                      const key = Object.keys(answer)[0]
                      return { value: key, label: answer[key] }
                    })}
                  />
                )
                break
              }
              case "checkbox": {
                component = (
                  <Field
                    key={i}
                    name={name}
                    component={CheckboxField}
                    opts={{
                      label: q.title
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
                      label: q.title
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
                    component={DateTimePickerField}
                    opts={{
                      label: q.title
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
                    component={DateTimePickerField}
                    opts={{
                      label: q.title,
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
                    fileUrl={fileUrls[i]}
                    opts={{
                      label: q.title
                    }}
                  />
                )
              }
            }

            return component
          })
        }
      </div>
    )
  }
}
