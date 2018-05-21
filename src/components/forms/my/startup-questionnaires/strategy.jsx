import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesStrategyForm",
  validate: (values) => {
    return Validators({
      tagline: [{ type: "length", opts: { max: 600 } }],
      unique_selling_point: [{ type: "length", opts: { max: 300 } }],
      customer_acquisition_cost: [{ type: "length", opts: { max: 300 } }],
      customer_life_value: [{ type: "length", opts: { max: 600 } }],
      startup_questionnaire_market_strategies: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            planned_for: ["presences"],
            detail: ["presences", { type: "length", opts: { max: 600 } }]
          }
        }
      }]
    }, values, ["startup_questionnaire_market_strategies"])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesStrategyForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          { // TODO2: remove?
            // <Field
            //   name="strategic_positioning"
            //   component={TextArea}
            //   opts={{
            //     label: "What is your strategic positionning ? *",
            //     hint: "variety-based positioning / need-based positionning / access-based positionning"
            //   }}
            // />
          }

          <Field
            name="unique_selling_point"
            component={TextArea}
            opts={{
              label: "What is your strategy ? Strategy differentiates the enterprise and gives it a competitive advantage - Start with your USP (Unique Selling Point) *",
              hint: "How your value proposition / Business Model delivers differentiation and competitive advantage to your company ? Explain what is different about your company's approach to the marketplace and how that difference will give the company a competitive advantage. Explain why this advantage will be sustainable in time."
            }}
          />

          <Field // TODO: max 300 character
            name="customer_acquisition_cost"
            component={TextArea}
            opts={{
              label: "What is your customer acquisition cost ? *",
              hint: "A short and rational explanation would be appreciated"
            }}
          />

          <Field // TODO: max 300 character
            name="customer_life_value"
            component={TextArea}
            opts={{
              label: "What is your customer life value ? *",
              hint: "A short and rational explanation would be appreciated"
            }}
          />

          <FieldArray
            name="startup_questionnaire_market_strategies"
            component={DynamicFieldArray}
            opts={{
              label: "What is your Marketing strategy and your timeline to access your targeted market ? *",
              groupName: "Strategy",
              newFieldInit: {
                planned_for: moment().toDate(),
                detail: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "planned_for",
                  component: DateTimePicker,
                  opts: {
                    placeholder: "Planned For",
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
            disabled={submitInProcess || pristine}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
