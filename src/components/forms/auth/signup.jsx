import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

import DynamicQuestionnaires from '../../shared/dynamic-questionnaires'

@reduxForm({
  form: "AuthSignupForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }],
      firstName: ["presences"],
      lastName: ["presences"]
    }, values)
  },
  enableReinitialize: true
})
export default class AuthSignupForm extends Component {
  formComponent() {
    const { handleSubmit, submitInProcess, questions } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <Field
              name="firstName"
              component={TextField}
              opts={{
                type: "text",
                label: "First Name *"
              }}
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <Field
              name="lastName"
              component={TextField}
              opts={{
                type: "text",
                label: "Last Name *"
              }}
            />
          </div>
        </div>

        <Field
          name="email"
          component={TextField}
          opts={{
            type: "email",
            label: "Email *"
          }}
        />

        <Field
          name="password"
          component={TextField}
          opts={{
            type: "password",
            label: "Password *"
          }}
        />

        {
          questions && (
            <DynamicQuestionnaires
              questions={questions}
              getName={(i) => {
                return `questionnaire[0].answers.[${i}].answer`
              }}
            />
          )
        }

        <div className="form-actions">
          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Continue
          </button>
        </div>

      </form>
    )
  }

  renderWarningAgreement() {
    const { investorWarning, agree } = this.props

    return (
      <div className="warning-agreement">
        <div className="content" dangerouslySetInnerHTML={{ __html: investorWarning.content.decode() }} />

        <div className="text-center">
          <button
            className="btn btn-info"
            onClick={() => { agree() }}
          >Agree</button>
        </div>
      </div>
    )
  }

  renderForm() {
    const { role, investorWarningAgreement } = this.props

    if (role) {
      if (role === "Investor" && !investorWarningAgreement) {
        return this.renderWarningAgreement()
      }

      return this.formComponent()
    } else {
      return null
    }
  }

  render() {
    const { optClass, changeRole, role } = this.props

    return (
      <div id="forms-auth-signup" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0 text-uppercase">Join AngelHub</h1>
        <p>You need to sign up to get full access. Free to join!</p>

        <div className="row">
          <div className="col-xs-6">
            <button
              className={`btn btn-block btn-${role === "Investor" ? "info" : "default"}`}
              onClick={() => { changeRole("Investor") }}
            >I am an Investor</button>
          </div>
          <div className="col-xs-6">
            <button
              className={`btn btn-block btn-${role === "StartupUser" ? "info" : "default"}`}
              onClick={() => { changeRole("StartupUser") }}
            >I am a Founder</button>
          </div>
        </div>

        { this.renderForm() }

        <hr />

        <div className="have-account">
          <span>Already have an account? </span><Link to="/auth/login">Log in here</Link>
        </div>
      </div>
    )
  }
}
