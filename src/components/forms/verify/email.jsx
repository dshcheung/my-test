import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import {
  requestVerification, REQUEST_VERIFICATION
} from '../../../actions/my/profile'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

const mapStateToProps = (state) => {
  return {
    requestVerificationInProcess: _.get(state.requestStatus, REQUEST_VERIFICATION),
    currentUser: _.get(state, 'session')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestVerification: bindActionCreators(requestVerification, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "VerifyEmailForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      code: ["presences"]
    }, values)
  }
})
export default class VerifyEmailForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, currentUser, requestVerificationInProcess } = this.props

    return (
      <div id="forms-verify-email" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">VERIFY EMAIL</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Email *"
            }}
          />

          <Field
            name="code"
            component={TextField}
            opts={{
              type: "text",
              label: "Verify Code *"
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Verify Your Email
          </button>
          {
            currentUser && (
              <button
                className={`btn btn-info btn-lg btn-block ${requestVerificationInProcess && "m-progress"}`}
                type="button"
                disabled={submitInProcess || requestVerificationInProcess}
                onClick={() => { this.props.requestVerification("email") }}
              >
                Resend Email Verification Code
              </button>
            )
          }
        </form>
      </div>
    )
  }
}
