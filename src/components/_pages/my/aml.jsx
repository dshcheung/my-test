import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { formatQuestionnaire } from '../../../services/utils'
import { notySuccess } from '../../../services/noty'

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
export default class MyAML extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ["stage_one", "stage_two", "stage_three", "stage_four"],
      currentStage: "stage_one",
      agreed: false
    }

    this.cMyQuestionnaire = this.cMyQuestionnaire.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_questionnaire" })
    this.props.gMyQuestionnaires()
  }

  componentWillUnmount() {
    this.props.resetMyQuestionnaires()
  }

  cMyQuestionnaire(values) {
    this.props.cMyQuestionnaire(values, () => {
      notySuccess("Submitted")
    })
  }

  render() {
    const { myQuestionnaires, gInvestorQInProcess, gMyQuestionnairesInProcess, investorQuestionnaires } = this.props

    if (gInvestorQInProcess || gMyQuestionnairesInProcess) return <LoadingSpinner />

    const currentQuestionnaire = _.get(investorQuestionnaires, 'kyc_aml.questions', [])
    const baseQuestionnaire = _.get(myQuestionnaires, 'kyc_aml', [])

    const fileUrls = {}
    const initialValues = {
      questionnaire_id: 'kyc_aml',
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
      <div id="pages-my-aml">
        <QuestionnaireForm
          optClass="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2"
          onSubmit={this.cMyQuestionnaire}
          submitInProcess={this.props.cMyQuestionnaireInProcess}
          title="AML"
          questionnaires={currentQuestionnaire}
          initialValues={initialValues}
          fileUrls={fileUrls}
          hideHintBtn
        />
      </div>
    )
  }
}
