import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import MobileField from '../../shared/form-elements/mobile-field'

@reduxForm({
  form: "VerifyMobileForm",
  validate: (values) => {
    return Validators({
      mobile: ["mobile"]
    }, values)
  },
  initialValues: {
    mobile: ''
  }
})
export default class VerifyMobileForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-verify-mobile" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="mobile"
            component={MobileField}
            opts={{
              label: "Mobile Number"
            }}
          />

          <div className="clearfix">
            <button
              className={`btn btn-primary pull-right ${submitInProcess && "m-progress"}`}
              type="submit"
              disabled={submitInProcess}
            >
              Resend
            </button>
          </div>
        </form>
      </div>
    )
  }
}
