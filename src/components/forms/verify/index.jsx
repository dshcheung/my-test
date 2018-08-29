import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

import NResetVerification from '../../modals/verify/n-resend-verification'

@reduxForm({
  form: "VerifyForm",
  validate: (values) => {
    return Validators({
      code: ["presences"]
    }, values)
  }
})
export default class VerifyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nResendVerification: false
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ nResendVerification: true })
  }

  close() {
    this.setState({ nResendVerification: false })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-verify" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">VERIFY</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="code"
            component={TextField}
            opts={{
              type: "text",
              label: "Verify Code"
            }}
          />

          <div>
            <a
              className="pull-left anchor-link"
              onClick={this.open}
            >Resend Verification Code</a>

            <button
              className={`btn btn-primary btn-outline pull-right ${submitInProcess && "m-progress"}`}
              type="submit"
              disabled={submitInProcess}
            >
              Verify
            </button>
          </div>
        </form>

        { this.state.nResendVerification && <NResetVerification close={this.close} /> }
      </div>
    )
  }
}
