import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupQuestionnaireStrategyForm",
  validate: (values) => {
    return Validators({
      strategic_positioning: ["presences"],
      unique_selling_point: ["presences"],
      customer_acquisition_cost: ["presences"],
      customer_life_value: ["presences"]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireStrategyForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="strategic_positioning"
            component={TextArea}
            opts={{
              label: "What is your strategic positionning ? *",
              hint: "variety-based positioning / need-based positionning / access-based positionning"
            }}
          />

          <Field
            name="unique_selling_point"
            component={TextArea}
            opts={{
              label: "What is your strategy ? Strategy differentiates the enterprise and gives it a competitive advantage - Start with your USP (Unique Selling Point) *",
              hint: "How your value proposition / Business Model delivers differentiation and competitive advantage to your company ? Explain what is different about your company's approach to the marketplace and how that difference will give the company a competitive advantage. Explain why this advantage will be sustainable in time."
            }}
          />

          <Field
            name="customer_acquisition_cost"
            component={TextArea}
            opts={{
              label: "What is your customer acquisition cost ? *",
              hint: "A short and rationale explanation would be appreciated"
            }}
          />

          <Field
            name="customer_life_value"
            component={TextArea}
            opts={{
              label: "What is your customer life value ? *",
              hint: "A short and rationale explanation would be appreciated"
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
