import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import RadioField from '../../shared/form-elements/radio-field'
import TextField from '../../shared/form-elements/text-field'
import DateTimePickerField from '../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "QuestionnaireForm",
  validate: (values) => {
    return Validators({
    }, values)
  }
})
export default class QuestionnaireForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, title, questionnaires } = this.props

    return (
      <div id="forms-my-questionnaire" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">{title}</h1>

        <form onSubmit={handleSubmit}>
          {
            questionnaires.map((question, i) => {
              let component = null
              const name = `${question.id}.answer`

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
