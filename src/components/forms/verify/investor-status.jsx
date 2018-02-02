import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import RadioField from '../../shared/form-elements/radio-field'

@reduxForm({
  form: "VerifyInvestorStatusForm",
  validate: (values) => {
    return Validators({
      status: ["presences", "investorStatus"]
    }, values)
  }
})
export default class VerifyInvestorStatusForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-verify-investor-status" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">VERIFY INVESTOR STATUS</h1>
        <p>Are you an Accredited Investor as defined by the SEC? Listed below are ways you may qualify.</p>

        <form onSubmit={handleSubmit}>
          <Field
            name="status"
            component={RadioField}
            optItemClass="radio-group"
            opts={[
              { value: "1", label: "I am an Accredited Investor because I had income exceeding $200,000, or income with my spouse exceeding $300,000, each of the past two years and expect the same this year." },
              { value: "2", label: "I am an Accredited Investor because I have individual net worth, or joint net worth with my spouse, that exceeds $1 million." },
              { value: "3", label: "I am Accredited Investor because I invest on behalf of an entity with at least $5M in assets or an entity in which all the owners are Accredited Investors (e.g. a venture capital fund, LLC)." },
              { value: "4", label: "I am Accredited Investor because I invest on behalf of a trust with at least $5M in assets and I have sufficient knowledge to evaluate the merits and risks of startup investing." },
              { value: "5", label: "I am not an Accredited Investor because none of the above apply to me." }
            ]}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Verify Your Status
          </button>
        </form>
      </div>
    )
  }
}
