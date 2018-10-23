import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { notyError } from '../../../services/noty'

import {
  G_MY_INVESTOR_AGREEMENT,
  U_MY_INVESTOR_AGREEMENT, uMyInvestorAgreement,
  D_MY_INVESTOR_AGREEMENT_ATTRIBUTE, dMyInvestorAgreementAttribute
} from '../../../actions/my/investor-agreements'

import {
  G_MY_INVESTOR_BANK_DETAIL,
  U_MY_INVESTOR_BANK_DETAIL, uMyInvestorBankDetail
} from '../../../actions/my/investor-bank-details'

import {
  gImmovable, resetImmovable,
  G_IMMOVABLE_LEGAL_AGREEMENT,
} from '../../../actions/immovables'

import LoadingSpinner from '../../shared/others/loading-spinner'
import SharedOthersSideTitle from '../../shared/others/side-title'

import InvestorValidationsAMLDocumentsForm from '../../forms/investor-validations/aml-documents'
import InvestorValidationsAMLBankDetailsForm from '../../forms/investor-validations/aml-bank-details'
import InvestorValidationsAMLSignatureForm from '../../forms/investor-validations/aml-signature'
import SharedInvestorAMLSubmission from './submission'

const mapStateToProps = (state) => {
  return {
    myInvestorAgreement: _.get(state, 'myInvestorAgreement'),
    gMyInvestorAgreementInProcess: _.get(state.requestStatus, G_MY_INVESTOR_AGREEMENT),
    uMyInvestorAgreementInProcess: _.get(state.requestStatus, U_MY_INVESTOR_AGREEMENT),
    dMyInvestorAgreementAttributeInProcess: _.get(state.requestStatus, D_MY_INVESTOR_AGREEMENT_ATTRIBUTE),
    myInvestorBankDetail: _.get(state, 'myInvestorBankDetail'),
    gMyInvestorBankDetailInProcess: _.get(state.requestStatus, G_MY_INVESTOR_BANK_DETAIL),
    uMyInvestorBankDetailInProcess: _.get(state.requestStatus, U_MY_INVESTOR_BANK_DETAIL),
    gLegalAgreementsInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT),
    legalAgreements: _.get(state, 'immovables.legal_agreement.legal_agreements', []),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyInvestorAgreement: bindActionCreators(uMyInvestorAgreement, dispatch),
    dMyInvestorAgreementAttribute: bindActionCreators(dMyInvestorAgreementAttribute, dispatch),
    uMyInvestorBankDetail: bindActionCreators(uMyInvestorBankDetail, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedInvestorAML extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "certified_documents",
          model: InvestorValidationsAMLDocumentsForm,
          nextTab: "bank_details",
        },
        {
          key: "bank_details",
          model: InvestorValidationsAMLBankDetailsForm,
          nextTab: "investor_agreement",
        },
        {
          key: "investor_agreement",
          model: InvestorValidationsAMLSignatureForm,
          nextTab: "submission"
        },
        {
          key: "submission",
          model: SharedInvestorAMLSubmission,
          nonForm: true,
          nextTab: null
        }
      ]
    }

    this.uMyInvestorAgreement = this.uMyInvestorAgreement.bind(this)
    this.dMyInvestorAgreementAttribute = this.dMyInvestorAgreementAttribute.bind(this)
    this.uMyInvestorBankDetail = this.uMyInvestorBankDetail.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  uMyInvestorAgreement(values) {
    const baseInfo = _.find(this.state.order, { key: this.props.currentTab })

    if (values === null) {
      this.props.changeTab(baseInfo.nextTab)
    } else {
      this.props.uMyInvestorAgreement(values, () => {
        this.props.changeTab(baseInfo.nextTab)
      })
    }
  }

  dMyInvestorAgreementAttribute(value, key, cb) {
    const valueID = _.get(value, 'id', null)
    const rootKey = key.split("[")[0]

    if (valueID) {
      this.props.dMyInvestorAgreementAttribute({
        [rootKey]: [{ id: valueID, _destroy: true }]
      }, cb)
    } else {
      if (cb) cb()
    }
  }

  uMyInvestorBankDetail(values) {
    const baseInfo = _.find(this.state.order, { key: this.props.currentTab })

    this.props.uMyInvestorBankDetail(values, () => {
      this.props.changeTab(baseInfo.nextTab)
    })
  }

  renderTab() {
    const {
      currentTab, myInvestorAgreement, myInvestorBankDetail,
      uMyInvestorAgreementInProcess, dMyInvestorAgreementAttributeInProcess,
      uMyInvestorBankDetailInProcess,
      legalAgreements
    } = this.props

    const investorAgreement = _.find(legalAgreements, { id: "investor-agreement" }) || {}
    const { order } = this.state
    const baseInfo = _.find(order, { key: currentTab })

    if (baseInfo.nonForm) {
      return <baseInfo.model routeParams={this.props.routeParams} />
    } else if (baseInfo.key === "certified_documents" || baseInfo.key === "investor_agreement") {
      return (
        <baseInfo.model
          optClass="col-sm-10 col-sm-offset-1 col-md-offset-0 col-md-8"
          initialValues={{
            attachments: myInvestorAgreement.attachments,
            signature: {}
          }}
          onSubmit={this.uMyInvestorAgreement}
          onSubmitFail={() => {
            notyError("Submission failed - please review error messages and try again")
          }}
          submitInProcess={uMyInvestorAgreementInProcess || dMyInvestorAgreementAttributeInProcess}
          dAttribute={this.dMyInvestorAgreementAttribute}
          investorAgreement={investorAgreement}
          signedDocument={null}
        />
      )
    } else if (baseInfo.key === "bank_details") {
      return (
        <baseInfo.model
          optClass="col-sm-10 col-sm-offset-1 col-md-offset-0 col-md-8"
          initialValues={myInvestorBankDetail}
          onSubmit={this.uMyInvestorBankDetail}
          onSubmitFail={() => {
            notyError("Submission failed - please review error messages and try again")
          }}
          submitInProcess={uMyInvestorBankDetailInProcess}
        />
      )
    }
  }

  render() {
    const {
      gMyInvestorAgreementInProcess, gMyInvestorBankDetailInProcess,
      gLegalAgreementsInProcess
    } = this.props

    if (gMyInvestorAgreementInProcess || gMyInvestorBankDetailInProcess || gLegalAgreementsInProcess) return <LoadingSpinner />

    return (
      <div>
        <SharedOthersSideTitle title="investor" optClass="hidden-xs hidden-sm col-md-offset-1 col-md-2" />

        { this.renderTab() }
      </div>
    )
  }
}
