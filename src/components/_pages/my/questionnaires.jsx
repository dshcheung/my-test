import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { formatQuestionnaire } from '../../../services/utils'

import { gImmovable, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE } from '../../../actions/immovables'
import {
  G_MY_QUESTIONNAIRES, gMyQuestionnaires, resetMyQuestionnaires,
  C_MY_QUESTIONNAIRE, cMyQuestionnaire
} from '../../../actions/my/questionnaires'

import LoadingSpinner from '../../shared/loading-spinner'

import QuestionnaireForm from '../../forms/my/questionnaires'

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
export default class MyQuestionnaires extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ["stage_one", "stage_two", "stage_three", "stage_four"],
      currentStage: "stage_one",
      agreed: false
    }

    this.cMyQuestionnaire = this.cMyQuestionnaire.bind(this)
    this.setNextStage = this.setNextStage.bind(this)
    this.setPathAndState = this.setPathAndState.bind(this)
  }

  componentWillMount() {
    this.setStage(this.props)
    this.props.gImmovable({ immovableID: "investor_questionnaire" })
    this.props.gMyQuestionnaires()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.hash !== nextProps.location.hash) {
      this.setStage(nextProps)
    }
  }

  componentWillUnmount() {
    this.props.resetMyQuestionnaires()
  }

  setPathAndState(stage) {
    this.props.router.replace(`${this.props.location.pathname}#${stage}`)
    this.setState({ currentStage: stage })
  }

  setNextStage(currentUser) {
    const stageStatus = _.get(currentUser, 'investor')
    const { order } = this.state

    if (stageStatus.completed) {
      this.setPathAndState("completed")
    } else {
      for (let i = 0; i < order.length; i += 1) {
        if (!stageStatus[order[i]]) {
          this.setPathAndState(order[i])
          break
        }
      }
    }
  }

  setStage(props) {
    const hash = props.location.hash && props.location.hash.split("#")[1]
    const exists = _.indexOf(this.state.order, hash) >= 0 || (_.get(props, 'currentUser.investor.completed') && hash === "completed")
    if (hash && exists) {
      this.setPathAndState(hash)
    } else {
      this.setNextStage(props.currentUser)
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
      <QuestionnaireForm
        optClass="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2"
        onSubmit={this.cMyQuestionnaire}
        submitInProcess={this.props.cMyQuestionnaireInProcess}
        title={title}
        questionnaires={currentQuestionnaire}
        initialValues={initialValues}
        fileUrls={fileUrls}
        hideHintBtn
      />
    )
  }

  agree() {
    this.setState({ agreed: true })
  }

  render() {
    const { currentUser, gInvestorQInProcess, gMyQuestionnairesInProcess, investorQuestionnaires } = this.props
    const { order, currentStage, agreed } = this.state

    const stageZeroQuestion = _.get(investorQuestionnaires, 'stage_zero.questions', [])[0]

    if (gInvestorQInProcess || gMyQuestionnairesInProcess || !stageZeroQuestion) return <LoadingSpinner />

    const stageStatus = currentUser.investor

    if (!stageStatus.stage_one && !agreed) {
      return (
        <div id="pages-my-questionnaires" className="container padding-bottom-15">
          <div className="content" dangerouslySetInnerHTML={{ __html: stageZeroQuestion.title.decode() }} />

          <div className="text-center">
            <button
              className="btn btn-info"
              onClick={() => { this.agree() }}
            >Agree</button>
          </div>
        </div>
      )
    }

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
                const stageTitle = _.get(investorQuestionnaires, `${o}.title`)
                return (
                  <div
                    key={i}
                    className={`pointer stage-item ${bgColor} ${activeBgColor}`}
                    onClick={() => { this.setPathAndState(o) }}
                  >{stageTitle || o.splitCap("_")}</div>
                )
              })
            }
            {
              stageStatus.completed && (
                <div
                  className="pointer stage-item bg-success"
                  onClick={() => { this.setPathAndState("completed") }}
                >Approval Stage</div>
              )
            }
          </div>
        </div>
        <div className="container">
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
