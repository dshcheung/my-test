import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { createUser, CREATE_USER } from '../../../actions/users'

import { gImmovable, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE, G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE, G_IMMOVABLE_LEGAL_AGREEMENT } from '../../../actions/immovables'

import AuthSignupForm from '../../forms/auth/signup'
import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    createUserInProcess: _.get(state.requestStatus, CREATE_USER),
    gInvestorQInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE),
    gStartupUserQInProcess: _.get(state.requestStatus, G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE),
    gLegalAgreementInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT),
    investorQuestions: _.get(state.immovables, 'investor_questionnaire.sign_up.questions', []),
    startupUserQuestions: _.get(state.immovables, 'startup_user_questionnaire.sign_up.questions', []),
    investorWarning: _.find(_.get(state.immovables, 'legal_agreement.legal_agreements', []), (la) => {
      return la.id === "investor-warning-statement"
    })
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
      role: null,
      investorWarningAgreement: false
    }

    this.createUser = this.createUser.bind(this)
    this.changeRole = this.changeRole.bind(this)
    this.agree = this.agree.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_questionnaire" })
    this.props.gImmovable({ immovableID: "startup_user_questionnaire" })
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  createUser(values) {
    this.props.createUser({
      ...values,
      role: this.state.role
    })
  }

  changeRole(role) {
    this.setState({ role, investorWarningAgreement: false })
  }

  agree() {
    this.setState({ investorWarningAgreement: true })
  }

  render() {
    const { investorQuestions, startupUserQuestions, gInvestorQInProcess, gStartupUserQInProcess, gLegalAgreementInProcess, investorWarning } = this.props
    const { role, investorWarningAgreement } = this.state

    if (gInvestorQInProcess || gStartupUserQInProcess || gLegalAgreementInProcess) return <LoadingSpinner />

    const initialValues = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      questionnaire: {
        questionnaire_id: "sign_up",
        answers: []
      }
    }
    const questions = role && role === "Investor" ? investorQuestions : startupUserQuestions

    questions.forEach((q) => {
      initialValues.questionnaire.answers.push({
        question_id: q.id,
        answer_type: q.type,
        answer: null
      })
    })

    if (role === "Investor") {
      initialValues.questionnaire.answers.push({
        question_id: "investor-warning-statement",
        answer_type: "checkbox",
        answer: investorWarningAgreement
      })
    }

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
            investorWarning={investorWarning}
            investorWarningAgreement={investorWarningAgreement}
            agree={this.agree}
            initialValues={initialValues}
          />
        </div>

        <div className="row">
          <div className="tnc col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <span>By joining AngelHub, you are agreeing to our </span>
            <Link to="/investor-agreement">Investor Registration Agreement</Link>
            <span> and </span>
            <Link>User Agreement</Link>
            <span>, and you will keep all information presented on this website confidential</span>
          </div>
        </div>
      </div>
    )
  }
}
