import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesTeaserForm",
  validate: (values) => {
    return Validators({
      problem: [{ type: "lengthWord", opts: { max: 100 } }],
      solution: [{ type: "lengthWord", opts: { max: 100 } }],
      revenue_model: [{ type: "lengthWord", opts: { max: 100 } }],
      value_proposition: [{ type: "lengthWord", opts: { max: 200 } }],
      startup_questionnaire_achievements: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            title: ["presences", { type: "lengthWord", opts: { max: 4 } }],
            content: ["presences", { type: "lengthWord", opts: { max: 20 } }]
          }
        }
      }]
    }, values, ["startup_questionnaire_achievements"])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesTeaserForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="startup_questionnaire_achievements"
            component={DynamicFieldArray}
            opts={{
              label: "Achievements *",
              groupName: "Achievement",
              newFieldInit: {
                occurred_on: moment().toDate(),
                title: '',
                content: ''
              },
              onDeleteField: dMSQAttributes,
              hint: "5 main achievements. For each, we need a 4 words max title, a date (optional, quarter/year), a nominal sentence of 20 words max. Make them count !",
              dynamicFields: [
                {
                  key: "occurred_on",
                  component: DateTimePicker,
                  opts: {
                    label: "Occured On",
                    time: false,
                    format: "DD/MM/YYYY"
                  }
                },
                {
                  key: "title",
                  component: TextArea,
                  opts: {
                    placeholder: "Title"
                  }
                },
                {
                  key: "content",
                  component: TextArea,
                  opts: {
                    placeholder: "Content"
                  }
                }
              ]
            }}
          />

          <Field
            name="problem"
            component={TextArea}
            opts={{
              label: "Problem"
            }}
          />

          <Field
            name="solution"
            component={TextArea}
            opts={{
              label: "Solution"
            }}
          />

          <Field
            name="revenue_model"
            component={TextArea}
            opts={{
              label: "How do you make money",
              hint: "and how much...."
            }}
          />

          <Field
            name="value_proposition"
            component={TextArea}
            opts={{
              label: "Unique selling point",
              hint: "Show us how your Selling Proposition is unique. Can be Product features, Market segment addressed, Marketing strategy.... Be precise."
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
