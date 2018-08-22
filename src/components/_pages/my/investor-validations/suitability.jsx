import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyInvestorQuestionnaire, G_MY_INVESTOR_QUESTIONNAIRE,
  uMyInvestorQuestionnaire, U_MY_INVESTOR_QUESTIONNAIRE
} from '../../../../actions/my/investor-questionnaires'

import {
  gImmovable, resetImmovable,
  G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS
} from '../../../../actions/immovables'

import { scrollTop } from '../../../../services/utils'

import SharedOthersSideTitle from '../../../shared/others/side-title'
import LoadingSpinner from '../../../shared/others/loading-spinner'

import InvestorValidationsSuitabilityTestForm from '../../../forms/investor-validations/suitability-test'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    uMyInvestorQuestionnaireInProcess: _.get(state.requestStatus, U_MY_INVESTOR_QUESTIONNAIRE),
    gMyInvestorQuestionnaireInProcess: _.get(state.requestStatus, G_MY_INVESTOR_QUESTIONNAIRE),
    myInvestorQuestionnaire: _.get(state, 'myInvestorQuestionnaire'),
    gInvestorQOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS),
    investorQOptions: _.get(state, 'immovables.investor_questionnaire_options')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyInvestorQuestionnaire: bindActionCreators(uMyInvestorQuestionnaire, dispatch),
    gMyInvestorQuestionnaire: bindActionCreators(gMyInvestorQuestionnaire, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyInvestorValidationsSuitability extends Component {
  componentWillMount() {
    this.props.gMyInvestorQuestionnaire()
    this.props.gImmovable({ immovableID: "investor_questionnaire_options" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  onUMyInvestorQuestionnaire(values) {
    this.props.uMyInvestorQuestionnaire(values, () => {
      this.setState({ sideTitleNumber: 2, updateUserStep: false, dummyTest: true })
      scrollTop()
    })
  }

  render() {
    const { gMyInvestorQuestionnaireInProcess, uMyInvestorQuestionnaireInProcess, gInvestorQOptionsInProcess, investorQOptions, myInvestorQuestionnaire } = this.props

    if (gMyInvestorQuestionnaireInProcess || gInvestorQOptionsInProcess) return <LoadingSpinner />

    return (
      <div id="my-investor-validations-suitability">
        <SharedOthersSideTitle title="investor" optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2" />

        <InvestorValidationsSuitabilityTestForm
          optClass="col-xs-12 col-sm-6"
          onSubmit={this.onUMyInvestorQuestionnaire.bind(this)}
          submitInProcess={uMyInvestorQuestionnaireInProcess}
          initialValues={myInvestorQuestionnaire}
          investorQOptions={investorQOptions}
        />
      </div>
    )
  }
}
