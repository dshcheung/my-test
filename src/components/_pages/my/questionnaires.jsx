import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { gImmovable, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE } from '../../../actions/immovables'
import {
  G_MY_QUESTIONNAIRES, gMyQuestionnaires, resetMyQuestionnaires,
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

    const updatedAt = _.get(myQuestionnaires[questionnaireID][questionID], 'updated_at')
    if (!updatedAt || updatedAt < question.updated_at) {
      myQuestionnaires[questionnaireID][questionID] = {
        question_id: questionID,
        answer_type: question.answer_type,
        updated_at: question.updated_at
      }

      switch (question.answer_type) {
        case "datetime":
          myQuestionnaires[questionnaireID][questionID].answer = moment(question.answer).toDate()
          break
        case "date":
          myQuestionnaires[questionnaireID][questionID].answer = moment(question.answer).toDate()
          break
        case "file":
          myQuestionnaires[questionnaireID][questionID].answer = ""
          myQuestionnaires[questionnaireID][questionID].answer_file = question.answer
          break
        default:
          myQuestionnaires[questionnaireID][questionID].answer = question.answer
      }
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
    gMyQuestionnairesInProcess: _.get(state.requestStatus, G_MY_QUESTIONNAIRES),
    myQuestionnaires: formatQuestionnaire(_.get(state, 'myQuestionnaires', []))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    gMyQuestionnaires: bindActionCreators(gMyQuestionnaires, dispatch),
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
    this.props.gMyQuestionnaires()
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

    const title = currentStage.splitCap("_").toUpperCase()
    const currentQuestionnaire = _.get(investorQuestionnaires, `${currentStage}.questions`, [])
    const baseQuestionnaire = _.get(myQuestionnaires, `${currentStage}`, [])

    const fileUrls = {}
    const initialValues = {
      questionnaire_id: currentStage,
      answers: currentQuestionnaire.map((question, i) => {
        const questionID = question.id

        if (question.type === "file") {
          fileUrls[i] = _.get(baseQuestionnaire[questionID], 'answer_file')
        }

        return {
          question_id: questionID,
          answer_type: question.type,
          answer: question.type === "datetime" || question.type === "date" ? moment().startOf('day').toDate() : null,
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
          fileUrls={fileUrls}
        />
      </div>
    )
  }

  render() {
    const { currentUser, gInvestorQInProcess, gMyQuestionnairesInProcess } = this.props
    const { order, stagesCompleted, currentStage } = this.state

    if (gInvestorQInProcess || gMyQuestionnairesInProcess) return <LoadingSpinner />

    const stageStatus = currentUser.investor

    return (
      <div id="pages-my-questionnaires">
        <div className="stage-nav">
          <div className="container">
            {
              order.map((o, i) => {
                // TODO: add in an invalid state for the KYC stage
                const isCompleted = stageStatus[o]
                const bgColor = isCompleted ? "bg-success" : ""
                const activeBgColor = currentStage === o ? "bg-info" : ""
                return (
                  <div
                    key={i}
                    className={`pointer stage-item ${bgColor} ${activeBgColor}`}
                    onClick={() => { this.setState({ currentStage: o }) }}
                  >{o.splitCap("_")}</div>
                )
              })
            }
            {
              stagesCompleted && (
                <div
                  className="pointer stage-item bg-success"
                  onClick={() => { this.setState({ currentStage: "completed" }) }}
                >Approval Stage</div>
              )
            }
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            {
              currentStage !== "completed" ? this.questionnaireForm() : (
                <div>Your Approval Process Has Been Initiated, Please Wait For Our Approval. If Any Information Was Incorrect You Can Still Go Back To Any Stages and Correct It</div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
