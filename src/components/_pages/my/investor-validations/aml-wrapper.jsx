import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { scrollTop } from '../../../../services/utils'

import SharedInvestorAML from '../../../shared/investor-aml/index'
import LoadingSpinner from '../../../shared/others/loading-spinner'
import SharedOthersTabNav from '../../../shared/others/tab-nav'

import {
  gMyInvestorAgreement, G_MY_INVESTOR_AGREEMENT, resetMyInvestorAgreement
} from '../../../../actions/my/investor-agreements'

import {
  gMyInvestorBankDetail, G_MY_INVESTOR_BANK_DETAIL, resetMyInvestorBankDetail
} from '../../../../actions/my/investor-bank-details'

import {
  gMyDocuments, G_MY_DOCUMENTS, resetMyDocuments
} from '../../../../actions/my/documents'

const mapStateToProps = (state) => {
  return {
    gMyInvestorAgreementInProcess: _.get(state.requestStatus, G_MY_INVESTOR_AGREEMENT),
    gMyInvestorBankDetailInProcess: _.get(state.requestStatus, G_MY_INVESTOR_BANK_DETAIL),
    gMyDocumentsInProcess: _.get(state.requestStatus, G_MY_DOCUMENTS)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyInvestorAgreement: bindActionCreators(gMyInvestorAgreement, dispatch),
    resetMyInvestorAgreement: bindActionCreators(resetMyInvestorAgreement, dispatch),
    gMyInvestorBankDetail: bindActionCreators(gMyInvestorBankDetail, dispatch),
    resetMyInvestorBankDetail: bindActionCreators(resetMyInvestorBankDetail, dispatch),
    gMyDocuments: bindActionCreators(gMyDocuments, dispatch),
    resetMyDocuments: bindActionCreators(resetMyDocuments, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class InvestorValidationsAMLWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "certified_documents",
          title: "Certified Documents"
        },
        {
          key: "bank_details",
          title: "Bank Details"
        },
        {
          key: "investor_agreement",
          title: "Investor Agreement"
        },
        {
          key: "submission",
          title: "Submission"
        }
      ],
      currentTab: props.params.tab
    }

    this.changeTab = this.changeTab.bind(this)
  }

  componentWillMount() {
    this.props.gMyInvestorAgreement()
    this.props.gMyInvestorBankDetail()
    this.props.gMyDocuments()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.tab !== "success" && nextProps.params.tab === "success") {
      this.setState({ currentTab: "success" })
    }
  }

  componentWillUnmount() {
    this.props.resetMyInvestorAgreement()
    this.props.resetMyInvestorBankDetail()
    this.props.resetMyDocuments()
  }

  changeTab(tab) {
    if (tab) {
      const { router } = this.props
      scrollTop()
      this.setState({ currentTab: tab })
      router.push(`/my/investor-validations/aml/${tab}`)
    }
  }

  renderTab() {
    const { router } = this.props
    const { currentTab } = this.state

    return (
      <SharedInvestorAML
        currentTab={currentTab}
        router={router}
        changeTab={this.changeTab}
      />
    )
  }

  render() {
    const { gMyInvestorAgreementInProcess, gMyInvestorBankDetailInProcess, gMyDocumentsInProcess } = this.props
    const { currentTab, order } = this.state

    if (gMyInvestorAgreementInProcess || gMyInvestorBankDetailInProcess || gMyDocumentsInProcess) return <LoadingSpinner />

    return (
      <div id="my-investors-validations-aml">
        {
          currentTab !== "success" && <SharedOthersTabNav order={order} currentTab={currentTab} handleClick={this.changeTab} />
        }

        { this.renderTab() }
      </div>
    )
  }
}
