import React, { Component } from 'react'
import { Field } from 'redux-form'

import CheckboxField from './checkbox-field'
import DateTimePicker from './datetime-picker'
import FileField from './file-field'
import RadioField from './radio-field'
import TextArea from './text-area'
import TextField from './text-field'

export default class DynamicQuestionnaires extends Component {
  render() {
    const {
      data, name,
      typeKey, hintKey, labelKey, optionsKey,
      enableHint
    } = this.props

    const type = _.get(data, typeKey, null)
    const label = _.get(data, labelKey, null)
    const hint = enableHint && _.get(data, hintKey, null)

    switch (type) {
      case "checkbox": {
        return (
          <Field
            name={name}
            component={CheckboxField}
            opts={{
              label,
              hint
            }}
          />
        )
      }
      case "datetime": {
        return (
          <Field
            name={name}
            component={DateTimePicker}
            opts={{
              label,
              hint
            }}
          />
        )
      }
      case "date": {
        return (
          <Field
            name={name}
            component={DateTimePicker}
            opts={{
              label,
              time: false,
              format: "MMM D, YYYY",
              hint
            }}
          />
        )
      }
      case "file": { // TODO: reconfigure for new filefield
        return (
          <Field
            name={name}
            component={FileField}
            opts={{
              label,
              // fileUrl: fileUrls[i],
              hint
            }}
          />
        )
      }
      case "radio": {
        const options = _.get(data, optionsKey, [])
        return (
          <Field
            name={name}
            component={RadioField}
            opts={{
              options,
              valueKey: (x) => {
                return Object.keys(x)[0]
              },
              nameKey: (x) => {
                return x[Object.keys(x)[0]]
              },
              label,
              optItemClass: "display-block",
              hint
            }}
          />
        )
      }
      case "textarea": {
        return (
          <Field
            name={name}
            component={TextArea}
            opts={{
              label,
              hint
            }}
          />
        )
      }
      case "text": {
        return (
          <Field
            name={name}
            component={TextField}
            opts={{
              type,
              label,
              hint
            }}
          />
        )
      }
    }
  }
}
