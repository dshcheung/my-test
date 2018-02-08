import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import RadioField from '../../shared/form-elements/radio-field'
import TextField from '../../shared/form-elements/text-field'
import CheckboxField from '../../shared/form-elements/checkbox-field'
import DateTimePickerField from '../../shared/form-elements/datetime-picker'
import FileField from '../../shared/form-elements/file-field'

@reduxForm({
  form: "QuestionnaireForm",
  validate: (values) => {
    return Validators({
    }, values)
  },
  enableReinitialize: true
})
export default class QuestionnaireForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, title, questionnaires, fileUrls } = this.props

    return (
      <div id="forms-my-questionnaire" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">{title}</h1>

        <form onSubmit={handleSubmit}>
          {
            questionnaires.map((question, i) => {
              let component = null
              const name = `answers.[${i}].answer`

              switch (question.type) {
                case "radio": {
                  component = (
                    <Field
                      key={i}
                      optItemClass="display-block"
                      name={name}
                      component={RadioField}
                      opts={question.answers.map((answer) => {
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
                        label: question.title
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
                        type: question.type,
                        label: question.title
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
                        label: question.title
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
                        label: question.title,
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
                        label: question.title
                      }}
                    />
                  )
                }
              }

              return component
            })
          }

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
