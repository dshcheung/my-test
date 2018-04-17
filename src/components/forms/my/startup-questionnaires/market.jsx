import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupQuestionnaireMarketForm",
  validate: (values) => {
    return Validators({
      market_metrics: [], // TODO: required file validator
      customer_persona: ["presences"],
      timing: [],
      risk_factors: ["presences"],
      competitors: ["presences"],
      barriers: ["presences"]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireMarketForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, initialValues } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="market_metrics"
            component={FileField}
            opts={{
              label: "Define your market & market metrics *",
              fileUrl: initialValues.market_metrics_url,
              hint: "Segment, geography, Size & growth, please explain your source or calculation. Any comparable market (other geography, other industry) to support your figures ? Your market share objective ?"
            }}
          />

          <Field
            name="customer_persona"
            component={TextArea}
            opts={{
              label: "Who is your customer persona ? *",
              hint: "For whom you are creating value. Please also tell us who is the paying customer, who may not be the same... A customer persona is a semi-fictional representation of your ideal customer based on market research and real data about your existing customers. "
            }}
          />

          <Field
            name="timing"
            component={TextArea}
            opts={{
              label: "Why is your timing right in entering this market ? (Optional)",
              hint: "because of course it IS right, no ? ;))"
            }}
          />

          <Field
            name="risk_factors"
            component={TextArea}
            opts={{
              label: "What are the risk factors specific to this market ? *",
              hint: "Solvability, security, consumer safety, regulation & liability, political / legal stability...."
            }}
          />

          <Field
            name="competitors"
            component={TextArea}
            opts={{
              label: "Who are your actual and potential competitors ? *",
              hint: "Come on, there should be ! and you'd better know them."
            }}
          />

          <Field
            name="barriers"
            component={TextArea}
            opts={{
              label: "What are the barriers to entry in your market for new competitors ? *",
              hint: "Patent, regulation, time to market, execution complexity, resource scarcity... It is important also to explain if YOU are building them and if they will be sustainable in time"
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
