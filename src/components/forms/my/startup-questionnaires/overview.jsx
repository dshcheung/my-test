import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import SelectField from '../../../shared/form-elements/select-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnaireOverviewForm",
  validate: (values) => {
    return Validators({
      problem: ["presences"],
      value_proposition: ["presences"],
      revenue_model: ["presences"],
      key_kpis: [],
      business_model: [],
      startup_questionnaire_past_milestones: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            detail: ["presences"]
          }
        }
      }]

    }, values, ["startup_questionnaire_past_milestones"])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireOverviewForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="problem"
            component={TextArea}
            opts={{
              label: "The Problem you solve ? *",
              hint: "Concise version. More can be explained in Overview section"
            }}
          />

          <Field
            name="value_proposition"
            component={TextArea}
            opts={{
              label: "What is the value-proposition offered to your customer ? *",
              hint: "That is where you explain thoroughly your product or service : this is the central masterpiece of your business model !"
            }}
          />

          <Field
            name="revenue_model"
            component={TextArea}
            opts={{
              label: "What is your revenue Model ? *",
              hint: "How do you make money and from whom. Please provide accurate figures."
            }}
          />

          <Field
            name="key_kpis"
            component={TextArea}
            opts={{
              label: "What are you key resource, key partner, key access channel to your market ? (Optional)",
              hint: "Just state one of each if applicable."
            }}
          />

          <Field
            name="business_model"
            component={SelectField}
            opts={{
              options: [
                { key: "cost", name: "Cost" },
                { key: "value", name: "Value" }
              ],
              allowEmptyValue: true,
              valueKey: "key",
              nameKey: "name",
              label: "Is your Business Model cost-driven or value-driven ? (Optional)",
              hint: "Do you compete on cost (get lowest cost and max volumes) or on value (max value to customer, niche market)"
            }}
          />

          <FieldArray
            name="startup_questionnaire_past_milestones"
            component={DynamicFieldArray}
            initialize
            opts={{
              label: "Past Milestones *",
              groupName: "Milestone",
              newFieldInit: {
                occurred_on: moment().toDate(),
                detail: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "occurred_on",
                  component: DateTimePicker,
                  opts: {
                    placeholder: "Occured On",
                    time: false,
                    format: "YYYY/MM/DD"
                  }
                },
                {
                  key: "detail",
                  component: TextArea,
                  opts: {
                    placeholder: "Detail"
                  }
                }
              ]
            }}
          />

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
