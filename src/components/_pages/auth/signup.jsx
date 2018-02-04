import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { createUser, CREATE_USER } from '../../../actions/users'

import { gImmovable, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE, G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE } from '../../../actions/immovables'

import AuthSignupForm from '../../forms/auth/signup'
import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    createUserInProcess: _.get(state.requestStatus, CREATE_USER),
    gInvestorQInProcess: _.get(state, `requestStatus[${G_IMMOVABLE_INVESTOR_QUESTIONNAIRE}]`),
    gStartupUserQInProcess: _.get(state, `requestStatus[${G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE}]`),
    investorQuestions: _.get(state, 'immovables.investor_questionnaire.sign_up.questions', []),
    startupUserQuestions: _.get(state, 'immovables.startup_user_questionnaire.sign_up.questions', []),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: bindActionCreators(createUser, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      role: null
    }

    this.createUser = this.createUser.bind(this)
    this.changeRole = this.changeRole.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_questionnaire" })
    this.props.gImmovable({ immovableID: "startup_user_questionnaire" })
  }

  createUser(values) {
    this.props.createUser({
      ...values,
      role: this.state.role
    })
  }

  changeRole(role) {
    this.setState({ role })
  }

  render() {
    const { investorQuestions, startupUserQuestions, gInvestorQInProcess, gStartupUserQInProcess } = this.props
    const { role } = this.state

    if (gInvestorQInProcess || gStartupUserQInProcess) return <LoadingSpinner />

    const questions = role && role === "Investor" ? investorQuestions : startupUserQuestions
    const initialValuesAnswers = questions.map((q) => {
      return {
        question_id: q.id,
        answer_type: q.type,
        answer: null
      }
    })

    return (
      <div id="page-auth-signup" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <AuthSignupForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.createUser}
            submitInProcess={this.props.createUserInProcess}
            changeRole={this.changeRole}
            role={role}
            questions={questions}
            initialValues={{
              email: "test@test.com",
              password: "123456",
              firstName: "Denis",
              lastName: "Cheung",
              questionnaire: {
                questionnaire_id: "sign_up",
                answers: initialValuesAnswers
              }
            }}
          />
        </div>

        <div className="row">
          <div className="tnc col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <span>By joining AngelHub, you are agreeing to our </span>
            <Link>Investor Registration Agreement</Link>
            <span> and </span>
            <Link>User Agreement</Link>
            <span>, and you will keep all information presented on this website confidential</span>
          </div>
        </div>
      </div>
    )
  }
}
