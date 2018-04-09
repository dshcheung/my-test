import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { formatQuestionnaire } from '../../../../services/utils'
import {
  C_MY_QUESTIONNAIRE, cMyQuestionnaire,
  G_MY_QUESTIONNAIRES, gMyQuestionnaires, resetMyQuestionnaires
} from '../../../../actions/my/questionnaires'

import {
  gImmovable, G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE, resetImmovable
} from '../../../../actions/immovables'

import LoadingSpinner from '../../../shared/loading-spinner'
import QuestionnaireForm from '../../../forms/my/questionnaires'

const mapStateToProps = (state, props) => {
  const startupID = _.get(props, 'routeParams.myStartupID')

  return {
    startupQuestionnaires: _.get(state.immovables, 'startup_user_questionnaire'),
    gImmovableInProcess: _.get(state.requestStatus, G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE),
    myQuestionnaires: formatQuestionnaire(_.get(state, 'myQuestionnaires', []), startupID),
    gMyQuestionnairesInProcess: _.get(state.requestStatus, G_MY_QUESTIONNAIRES),
    cMyQuestionnaireInProcess: _.get(state.requestStatus, C_MY_QUESTIONNAIRE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyQuestionnaire: bindActionCreators(cMyQuestionnaire, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch),
    gMyQuestionnaires: bindActionCreators(gMyQuestionnaires, dispatch),
    resetMyQuestionnaires: bindActionCreators(resetMyQuestionnaires, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedMyCampaignsStageTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ["highlights", "overview", "market", "strategy", "team", "financials", "investment_proposition"],
      currentStage: "highlights"
    }

    this.cMyQuestionnaire = this.cMyQuestionnaire.bind(this)
    this.setNextStage = this.setNextStage.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "startup_user_questionnaire" })
    this.props.gMyQuestionnaires()
  }

  componentWillUnmount() {
    this.props.resetMyQuestionnaires()
  }

  setNextStage() {
    const { order, currentStage } = this.state

    const nextIndex = _.indexOf(order, currentStage) + 1
    const nextStage = order[nextIndex]

    if (nextStage) {
      this.changeStage(nextStage)
    } else {
      this.props.changeStage("stage_three")
    }
  }

  changeStage(stage) {
    this.setState({ currentStage: stage })
  }

  cMyQuestionnaire(values) {
    this.props.cMyQuestionnaire(values, () => {
      this.setNextStage()
    }, this.props.routeParams)
  }

  questionnaireForm() {
    const { startupQuestionnaires, myQuestionnaires } = this.props
    const currentStage = this.state.currentStage

    const title = currentStage.splitCap("_").toUpperCase()
    const currentQuestionnaire = _.get(startupQuestionnaires, `${currentStage}.questions`, [])
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
      <div className="col-xs-12">
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
    const { gImmovableInProcess, gMyQuestionnairesInProcess } = this.props
    const { currentStage } = this.state

    if (gImmovableInProcess || gMyQuestionnairesInProcess) return <LoadingSpinner />

    return (
      <div id="shared-my-campaigns-stage-two">
        <div className="stage-nav">
          <div className="container">
            {
              this.state.order.map((s, i) => {
                const bgColor = currentStage === s ? "bg-info" : ""
                return (
                  <div
                    key={i}
                    className={`pointer stage-item ${bgColor}`}
                    onClick={() => {
                      this.changeStage(s)
                    }}
                  >{s.splitCap("_")}</div>
                )
              })
            }
          </div>
        </div>

        {
          this.questionnaireForm()
        }
      </div>
    )
  }
}
