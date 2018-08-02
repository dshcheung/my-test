import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

// TODO: change back to mobilefield
// import MobileField from '../../shared/form-elements/mobile-field'
import TextField from '../../shared/form-elements/text-field'

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
            component={TextField}
            opts={{
              label: "Mobile Number"
            }}
          />

          <div className="clearfix">
            <button
              className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
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
