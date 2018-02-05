import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { gImmovable, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE } from '../../../actions/immovables'
import {
  G_MY_QUESTIONNAIRE, gMyQuestionnaire, resetMyQuestionnaires,
  C_MY_QUESTIONNAIRE, cMyQuestionnaire
} from '../../../actions/my/questionnaires'

import LoadingSpinner from '../../shared/loading-spinner'

import QuestionnaireForm from '../../forms/my/questionnaires'

const formatQuestionnaire = (questionnaires) => {
  const myQuestionnaires = {}

  for (let i = 0; i < questionnaires.length; i += 1) {
    const question = questionnaires[i]
    const questionnaireID = question.questionnaire_id
    const questionID = question.question_id

    if (!myQuestionnaires[questionnaireID]) {
      myQuestionnaires[questionnaireID] = {}
    }

    myQuestionnaires[questionnaireID][questionID] = {
      question_id: questionID,
      answer_type: question.answer_type,
      answer: (question.answer_type === "datetime" || question.answer_type === "date") ? moment(question.answer).toDate() : question.answer
    }
  }

  return myQuestionnaires
}

const mapStateToProps = (state) => {
  return {
    gInvestorQInProcess: _.get(state, `requestStatus[${G_IMMOVABLE_INVESTOR_QUESTIONNAIRE}]`),
    currentUser: _.get(state, 'session'),
    investorQuestionnaires: _.get(state, 'immovables.investor_questionnaire', []),
    cMyQuestionnaireInProcess: _.get(state.requestStatus, C_MY_QUESTIONNAIRE),
    gMyQuestionnaireInProcess: _.get(state.requestStatus, G_MY_QUESTIONNAIRE),
    myQuestionnaires: formatQuestionnaire(_.get(state, 'myQuestionnaires', []))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    gMyQuestionnaire: bindActionCreators(gMyQuestionnaire, dispatch),
    resetMyQuestionnaires: bindActionCreators(resetMyQuestionnaires, dispatch),
    cMyQuestionnaire: bindActionCreators(cMyQuestionnaire, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ValidationStageOne extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ["stage_one", "stage_two", "stage_three", "stage_four"],
      currentStage: null,
      stagesCompleted: false
    }

    this.cMyQuestionnaire = this.cMyQuestionnaire.bind(this)
    this.setNextStage = this.setNextStage.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_questionnaire" })
    this.props.gMyQuestionnaire()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.currentStage && nextProps.currentUser) {
      this.setNextStage(nextProps.currentUser)
    }
  }

  componentWillUnmount() {
    this.props.resetMyQuestionnaires()
  }

  setNextStage(currentUser) {
    const stageStatus = _.get(currentUser, 'investor')
    const { order } = this.state

    if (stageStatus.completed) {
      this.setState({ stagesCompleted: true, currentStage: "completed" })
    } else {
      for (let i = 0; i < order.length; i += 1) {
        if (!stageStatus[order[i]]) {
          this.setState({ currentStage: order[i] })
          i = order.length
        }
      }
    }
  }

  cMyQuestionnaire(values) {
    this.props.cMyQuestionnaire(values, (currentUser) => {
      this.setNextStage(currentUser)
    })
  }

  questionnaireForm() {
    const { investorQuestionnaires, myQuestionnaires } = this.props
    const currentStage = this.state.currentStage

    if (currentStage === null) return null

    const currentQuestionnaire = _.get(investorQuestionnaires, `${currentStage}.questions`, [])
    const baseQuestionnaire = _.get(myQuestionnaires, `${currentStage}`, [])

    const title = currentStage.splitCap("_").toUpperCase()

    const initialValues = {
      questionnaire_id: currentStage,
      answers: currentQuestionnaire.map((question) => {
        const questionID = question.id

        return {
          question_id: questionID,
          answer_type: question.type,
          answer: (question.type === "datetime" || question.type === "date") ? moment().startOf('day').toDate() : null,
          ...baseQuestionnaire[questionID]
        }
      })
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
    const { currentUser, gInvestorQInProcess, gMyQuestionnaireInProcess } = this.props
    const { order, stagesCompleted, currentStage } = this.state

    if (gInvestorQInProcess || gMyQuestionnaireInProcess) return <LoadingSpinner />

    const stageStatus = currentUser.investor

    return (
      <div id="pages-my-questionnaires" className="container">
        <div className="stage-nav">
          {
            order.map((o, i) => {
              const isCompleted = stageStatus[o]
              const color = isCompleted ? "success" : "warning"
              return (
                <div className="nav-item" key={i}>
                  <button
                    className={`btn btn-${color}`}
                    onClick={() => { this.setState({ currentStage: o }) }}
                  >{o.splitCap("_")}</button>
                  <span><i className="fa fa-arrow-right" /></span>
                </div>
              )
            })
          }
          {
            stagesCompleted && (
              <div className="nav-item">
                <button
                  className="btn btn-success"
                  onClick={() => { this.setState({ currentStage: "completed" }) }}
                >Approval Stage</button>
              </div>
            )
          }
        </div>

        {
          currentStage !== "completed" ? this.questionnaireForm() : (
            <div>Your Approval Process Has Been Initiated, Please Wait For Our Approval. If Any Information Was Incorrect You Can Still Go Back To Any Stages and Correct It</div>
          )
        }
      </div>
    )
  }
}
