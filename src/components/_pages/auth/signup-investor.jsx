import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { scrollTop } from '../../../services/utils'

import { createUser, CREATE_USER } from '../../../actions/users'

import { gImmovable, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE, G_IMMOVABLE_LEGAL_AGREEMENT } from '../../../actions/immovables'

import AuthSignupQuestionnaireForm from '../../forms/auth/signup-questionnaire'
import AuthSignupInvestorForm from '../../forms/auth/signup-investor'

import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    createUserInProcess: _.get(state.requestStatus, CREATE_USER),
    gInvestorQInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE),
    gLegalAgreementInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT),
    investorQuestionnaire: _.get(state.immovables, 'investor_questionnaire', {}),
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
export default class SignupInvestor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      agreed: false,
      score: 0,
      questionnaireCompleted: false,
      questionnaires: [],
      currentQuestionnaireIndex: 0,
      questionnaireOrder: ["startup_investing_risks", "investing_process", "after_you_invest"]
    }

    this.createUser = this.createUser.bind(this)
    this.saveQuestionnaire = this.saveQuestionnaire.bind(this)
    this.agree = this.agree.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_questionnaire" })
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  createUser(values) {
    this.props.createUser({
      ...values,
      role: "Investor",
      questionnaire: this.state.questionnaires
    })
  }

  calculateScore(questionnaires) {
    let score = 0

    questionnaires.forEach((q) => {
      const answers = _.get(q, 'answers', [])
      answers.forEach((a) => {
        const correctAnswer = _.get(a, 'correctAnswer', null)
        const answer = _.get(a, 'answer', null)

        if (answer === correctAnswer) score += 1
      })
    })

    this.setState({ score })
  }

  saveQuestionnaire(values) {
    const { questionnaireOrder, currentQuestionnaireIndex, questionnaires } = this.state
    const newQuestionnaires = [...questionnaires, values.questionnaire]

    if (questionnaireOrder.length === currentQuestionnaireIndex + 1) {
      this.calculateScore(newQuestionnaires)
      this.setState({ questionnaireCompleted: true })
    }

    scrollTop()
    this.setState({ questionnaires: newQuestionnaires, currentQuestionnaireIndex: currentQuestionnaireIndex + 1 })
  }

  agree() {
    this.setState({ agreed: true })
  }

  renderStages() {
    const { investorWarning, createUserInProcess } = this.props
    const { agreed, questionnaireCompleted, score } = this.state

    if (!agreed && investorWarning) { // TODO2: make as modal
      return (
        <div className="warning-agreement">
          <div className="content" dangerouslySetInnerHTML={{ __html: investorWarning.content.decode() }} />

          <div className="text-center">
            <button
              className="btn btn-info"
              onClick={() => { this.agree() }}
            >Agree</button>
          </div>
        </div>
      )
    } else if (!questionnaireCompleted) {
      const { investorQuestionnaire } = this.props
      const { currentQuestionnaireIndex, questionnaireOrder } = this.state

      const questions = _.get(investorQuestionnaire, `${questionnaireOrder[currentQuestionnaireIndex]}.questions`, [])
      const initialValues = {
        questionnaire: {
          questionnaire_id: "startup_investing_risks",
          answers: questions.map((q) => {
            return {
              question_id: q.id,
              answer_type: q.type,
              answer: "",
              title: q.title,
              hint: q.hint,
              options: q.options,
              validations: q.validations,
              correctAnswer: q.answer
            }
          })
        }
      }

      return (
        <AuthSignupQuestionnaireForm
          onSubmit={this.saveQuestionnaire}
          initialValues={initialValues}
        />
      )
    } else if (score < 6) {
      return ( // TODO2: log user ip & score
        <div>You do not currently meet the requirements for our investment platform</div>
      )
    } else {
      return (
        <AuthSignupInvestorForm
          onSubmit={this.createUser}
          submitInProcess={createUserInProcess}
        />
      )
    }
  }

  render() {
    const { gInvestorQInProcess, gLegalAgreementInProcess } = this.props

    if (gInvestorQInProcess || gLegalAgreementInProcess) return <LoadingSpinner />

    return (
      <div id="page-auth-signup-investor" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 signup-wrapper">
            <h1 className="title margin-bottom-20 margin-top-0 text-uppercase">Join As Investor</h1>
            {this.renderStages()}
          </div>
        </div>
      </div>
    )
  }
}
