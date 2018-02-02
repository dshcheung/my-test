import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { gImmovable, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE } from '../../../actions/immovables'
import { C_MY_QUESTIONNAIRE, cMyQuestionnaire } from '../../../actions/my/questionnaires'

import LoadingSpinner from '../../shared/loading-spinner'

import QuestionnaireForm from '../../forms/my/questionnaires'

const mapStateToProps = (state) => {
  return {
    gInvestorQInProcess: _.get(state, `requestStatus[${G_IMMOVABLE_INVESTOR_QUESTIONNAIRE}]`),
    currentUser: _.get(state, 'session'),
    investorQuestionnaires: _.get(state, 'immovables.investor_questionnaire', []),
    cMyQuestionnaireInProcess: _.get(state.requestStatus, C_MY_QUESTIONNAIRE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    cMyQuestionnaire: bindActionCreators(cMyQuestionnaire, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ValidationStageOne extends Component {
  constructor(props) {
    super(props)

    this.cMyQuestionnaire = this.cMyQuestionnaire.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_questionnaire" })
  }

  getStage(stageStatus, order) {
    for (let i = 0; i < order.length; i += 1) {
      if (!stageStatus[order[i]]) {
        return order[i]
      }
    }

    return null
  }

  cMyQuestionnaire(values) {
    this.props.cMyQuestionnaire(values)
  }

  investor() {
    const { currentUser, investorQuestionnaires } = this.props
    const stageStatus = currentUser.investor

    if (stageStatus.completed) {
      return (
        <div>Please Wait For Our Review And Approval</div>
      )
    }

    const order = ["stage_one", "stage_two", "stage_three", "stage_four"]
    const currentStage = this.getStage(stageStatus, order)
    const currentQuestionnaire = _.get(investorQuestionnaires, `${currentStage}.questions`, [])
    const title = currentStage.splitCap("_").toUpperCase()

    const initialValues = {
      questionnaire_id: currentStage
    }

    for (let i = 0; i < currentQuestionnaire.length; i += 1) {
      const question = currentQuestionnaire[i]
      initialValues[question.id] = {
        question_id: question.id,
        answer_type: question.type,
        answer: question.type === "datetime" || question.type === "date" ? moment().startOf('day').toDate() : null
      }
    }

    return (
      <div className="row">
        <QuestionnaireForm
          optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
          onSubmit={this.cMyQuestionnaire}
          submitInProcess={this.props.cMyQuestionnaireInProcess}
          title={title}
          questionnaires={currentQuestionnaire}
          initialValues={initialValues}
        />
      </div>
    )
  }

  render() {
    const { gInvestorQInProcess } = this.props

    if (gInvestorQInProcess) return <LoadingSpinner />

    return (
      <div id="pages-my-questionnaires" className="container">
        {this.investor()}
      </div>
    )
  }
}
