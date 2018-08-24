import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { notyError } from '../../../services/noty'

import {
  G_MY_INVESTOR_QUESTIONNAIRE,
  U_MY_INVESTOR_QUESTIONNAIRE, uMyInvestorQuestionnaire,
  D_MY_INVESTOR_QUESTIONNAIRE_ATTRIBUTE, dMyInvestorQuestionnaireAttribute
} from '../../../actions/my/investor-questionnaires'

import {
  gImmovable, resetImmovable,
  G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS,
  G_IMMOVABLE_INVESTOR_TYPE_OF_PRODUCT_OPTIONS,
  G_IMMOVABLE_INVESTOR_SOURCE_OF_FUND_OPTIONS
} from '../../../actions/immovables'

import LoadingSpinner from '../../shared/others/loading-spinner'
import SharedOthersSideTitle from '../../shared/others/side-title'

import InvestorValidationsSuitabilityFinanceForm from '../../forms/investor-validations/suitability-finance'
import InvestorValidationsSuitabilityExperienceForm from '../../forms/investor-validations/suitability-experience'
import InvestorValidationsSuitabilityDocumentsForm from '../../forms/investor-validations/suitability-documents'
import InvestorValidationsSuitabilityAssessmentForm from '../../forms/investor-validations/suitability-assessment'
import SharedInvestorQuestionnairesSubmission from '../../shared/investor-questionnaires/submission'

const mapStateToProps = (state) => {
  return {
    myInvestorQuestionnaire: _.get(state, 'myInvestorQuestionnaire'),
    gMyInvestorQuestionnaireInProcess: _.get(state.requestStatus, G_MY_INVESTOR_QUESTIONNAIRE),
    uMyInvestorQuestionnaireInProcess: _.get(state.requestStatus, U_MY_INVESTOR_QUESTIONNAIRE),
    dMyInvestorQuestionnaireAttributeInProcess: _.get(state.requestStatus, D_MY_INVESTOR_QUESTIONNAIRE_ATTRIBUTE),
    gInvestorQOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_QUESTIONNAIRE_OPTIONS),
    gInvestorPOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_TYPE_OF_PRODUCT_OPTIONS),
    gInvestorFOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_SOURCE_OF_FUND_OPTIONS),
    investorQOptions: _.get(state, 'immovables.investor_questionnaire_options', {}),
    investorPOptions: _.get(state, 'immovables.investor_type_of_product_options', []),
    investorFOptions: _.get(state, 'immovables.investor_source_of_fund_options', [])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyInvestorQuestionnaire: bindActionCreators(uMyInvestorQuestionnaire, dispatch),
    dMyInvestorQuestionnaireAttribute: bindActionCreators(dMyInvestorQuestionnaireAttribute, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedInvestorQuestionnaires extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "finance",
          model: InvestorValidationsSuitabilityFinanceForm,
          nextTab: "experience",
        },
        {
          key: "experience",
          model: InvestorValidationsSuitabilityExperienceForm,
          nextTab: "documents",
        },
        {
          key: "documents",
          model: InvestorValidationsSuitabilityDocumentsForm,
          nextTab: "assessment",
        },
        {
          key: "assessment",
          model: InvestorValidationsSuitabilityAssessmentForm,
          nextTab: "submission",
        },
        {
          key: "submission",
          model: SharedInvestorQuestionnairesSubmission,
          nextTab: null,
          nonForm: true
        }
      ]
    }

    this.uMyInvestorQuestionnaire = this.uMyInvestorQuestionnaire.bind(this)
    this.dMyInvestorQuestionnaireAttribute = this.dMyInvestorQuestionnaireAttribute.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_questionnaire_options" })
    this.props.gImmovable({ immovableID: "investor_type_of_product_options" })
    this.props.gImmovable({ immovableID: "investor_source_of_fund_options" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  uMyInvestorQuestionnaire(values) {
    const baseInfo = _.find(this.state.order, { key: this.props.currentTab })

    this.props.uMyInvestorQuestionnaire(values, () => {
      this.props.changeTab(baseInfo.nextTab)
    })
  }

  dMyInvestorQuestionnaireAttribute(value, key, cb) {
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

  renderTab() {
    const {
      currentTab, myInvestorQuestionnaire,
      uMyInvestorQuestionnaireInProcess, dMyStartupQuestionnaireAttributeInProcess,
      investorQOptions, investorPOptions, investorFOptions
    } = this.props
    const { order } = this.state
    const baseInfo = _.find(order, { key: currentTab })

    if (baseInfo.nonForm) {
      return <baseInfo.model routeParams={this.props.routeParams} />
    } else {
      return (
        <baseInfo.model
          optClass="col-sm-10 col-sm-offset-1 col-md-offset-0 col-md-8"
          initialValues={myInvestorQuestionnaire}
          onSubmit={this.uMyInvestorQuestionnaire}
          onSubmitFail={() => {
            notyError("Submission failed - please review error messages and try again")
          }}
          submitInProcess={uMyInvestorQuestionnaireInProcess || dMyStartupQuestionnaireAttributeInProcess}
          dAttribute={this.dMyInvestorQuestionnaireAttribute}
          investorQOptions={investorQOptions}
          investorPOptions={investorPOptions}
          investorFOptions={investorFOptions}
        />
      )
    }
  }

  render() {
    const {
      gMyInvestorQuestionnaireInProcess,
      gInvestorQOptionsInProcess, gInvestorPOptionsInProcess, gInvestorFOptionsInProcess
    } = this.props

    if (gMyInvestorQuestionnaireInProcess || gInvestorQOptionsInProcess || gInvestorPOptionsInProcess || gInvestorFOptionsInProcess) return <LoadingSpinner />

    return (
      <div>
        <SharedOthersSideTitle title="investor" optClass="hidden-xs hidden-sm col-md-offset-1 col-md-2" />

        { this.renderTab() }
      </div>
    )
  }
}
