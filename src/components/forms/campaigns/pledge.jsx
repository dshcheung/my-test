import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "CampaignPledgeForm",
  validate: (values) => {
    return Validators({
      amount: ["presences"]
    }, values)
  }
})
export default class CampaignPledgeForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-profile-basic" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="amount"
            component={TextField}
            opts={{
              type: "number",
              label: "Amount *"
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
