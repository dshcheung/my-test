import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyInvestorQuestionnaire, G_MY_INVESTOR_QUESTIONNAIRE,
  uMyInvestorQuestionnaire, U_MY_INVESTOR_QUESTIONNAIRE,
  dMyInvestorQuestionnaireAttribute
} from '../../../../actions/my/investor-questionnaires'

import {
  gImmovable, resetImmovable,
  G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS,
  G_IMMOVABLE_INVESTOR_TYPE_OF_PRODUCT_OPTIONS,
  G_IMMOVABLE_INVESTOR_SOURCE_OF_FUND_OPTIONS
} from '../../../../actions/immovables'

import { scrollTop } from '../../../../services/utils'

import SharedOthersSideTitle from '../../../shared/others/side-title'
import LoadingSpinner from '../../../shared/others/loading-spinner'

import SharedInvestorQuestionnairesSubmission from '../../../shared/investor-questionnaires/submission'

import InvestorValidationsSuitabilityFinanceForm from '../../../forms/investor-validations/suitability-finance'
import InvestorValidationsSuitabilityExperienceForm from '../../../forms/investor-validations/suitability-experience'
import InvestorValidationsSuitabilityDocumentsForm from '../../../forms/investor-validations/suitability-documents'
import InvestorValidationsSuitabilityAssessmentForm from '../../../forms/investor-validations/suitability-assessment'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    uMyInvestorQuestionnaireInProcess: _.get(state.requestStatus, U_MY_INVESTOR_QUESTIONNAIRE),
    gMyInvestorQuestionnaireInProcess: _.get(state.requestStatus, G_MY_INVESTOR_QUESTIONNAIRE),
    myInvestorQuestionnaire: _.get(state, 'myInvestorQuestionnaire'),
    gInvestorQOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS),
    investorQOptions: _.get(state, 'immovables.investor_questionnaire_options', {}),
    gInvestorPOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_TYPE_OF_PRODUCT_OPTIONS),
    investorPOptions: _.get(state, 'immovables.investor_type_of_product_options', []),
    gInvestorFOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_SOURCE_OF_FUND_OPTIONS),
    investorFOptions: _.get(state, 'immovables.investor_source_of_fund_options', [])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyInvestorQuestionnaire: bindActionCreators(uMyInvestorQuestionnaire, dispatch),
    gMyInvestorQuestionnaire: bindActionCreators(gMyInvestorQuestionnaire, dispatch),
    dMyInvestorQuestionnaireAttribute: bindActionCreators(dMyInvestorQuestionnaireAttribute, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyInvestorValidationsSuitability extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      maxIndex: 3
    }

    this.uMyInvestorQuestionnaire = this.uMyInvestorQuestionnaire.bind(this)
    this.dAttribute = this.dAttribute.bind(this)
  }

  componentWillMount() {
    this.props.gMyInvestorQuestionnaire()
    this.props.gImmovable({ immovableID: "investor_questionnaire_options" })
    this.props.gImmovable({ immovableID: "investor_type_of_product_options" })
    this.props.gImmovable({ immovableID: "investor_source_of_fund_options" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  uMyInvestorQuestionnaire(values, dispatch, props) {
    const { pristine } = props
    const { currentIndex } = this.state

    if (pristine) {
      this.setState({ currentIndex: currentIndex + 1 })
      scrollTop()
    } else {
      this.props.uMyInvestorQuestionnaire(values, () => {
        this.setState({ currentIndex: currentIndex + 1 })
        scrollTop()
      })
    }
  }

  dAttribute(value, key, cb) {
    const valueID = _.get(value, 'id', null)
    const rootKey = key.split("[")[0]

    if (valueID) {
      this.props.dMyInvestorQuestionnaireAttribute({
        [rootKey]: [{ id: valueID, _destroy: true }]
      }, cb)
    } else {
      if (cb) cb()
    }
  }

  render() {
    const {
      gMyInvestorQuestionnaireInProcess, uMyInvestorQuestionnaireInProcess,
      gInvestorQOptionsInProcess, gInvestorPOptionsInProcess, gInvestorFOptionsInProcess,
      investorQOptions, investorPOptions, investorFOptions,
      myInvestorQuestionnaire
    } = this.props

    const { currentIndex } = this.state

    if (gMyInvestorQuestionnaireInProcess || gInvestorQOptionsInProcess || gInvestorPOptionsInProcess || gInvestorFOptionsInProcess) return <LoadingSpinner />

    const commonProps = {
      optClass: "col-xs-12 col-sm-6",
      dAttribute: this.dAttribute,
      onSubmit: this.uMyInvestorQuestionnaire,
      submitInProcess: uMyInvestorQuestionnaireInProcess,
      initialValues: myInvestorQuestionnaire,
      investorQOptions,
      investorPOptions,
      investorFOptions
    }

    return (
      <div id="my-investor-validations-suitability">
        <SharedOthersSideTitle title="investor" optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2" />

        { currentIndex === 0 && <InvestorValidationsSuitabilityFinanceForm {...commonProps} /> }
        { currentIndex === 1 && <InvestorValidationsSuitabilityExperienceForm {...commonProps} /> }
        { currentIndex === 2 && <InvestorValidationsSuitabilityDocumentsForm {...commonProps} /> }
        { currentIndex === 3 && <InvestorValidationsSuitabilityAssessmentForm {...commonProps} /> }
        { currentIndex === 4 && <SharedInvestorQuestionnairesSubmission optClass="col-xs-12 col-sm-6" /> }
      </div>
    )
  }
}
