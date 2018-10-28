import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { scrollTop } from '../../../../services/utils'

import {
  gMyInvestorQuestionnaire, G_MY_INVESTOR_QUESTIONNAIRE, resetMyInvestorQuestionnaire
} from '../../../../actions/my/investor-questionnaires'

import SharedInvestorSuitability from '../../../shared/investor-suitability/index'
import LoadingSpinner from '../../../shared/others/loading-spinner'
import SharedOthersTabNav from '../../../shared/others/tab-nav'

const mapStateToProps = (state) => {
  return {
    gMyInvestorQuestionnaireInProcess: _.get(state.requestStatus, G_MY_INVESTOR_QUESTIONNAIRE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyInvestorQuestionnaire: bindActionCreators(gMyInvestorQuestionnaire, dispatch),
    resetMyInvestorQuestionnaire: bindActionCreators(resetMyInvestorQuestionnaire, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class InvestorValidationsSuitabilityWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "finance",
          title: "Finance"
        },
        {
          key: "experience",
          title: "Experience"
        },
        {
          key: "documents",
          title: "Documents"
        },
        {
          key: "assessment",
          title: "Assessment"
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
    this.props.gMyInvestorQuestionnaire()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.tab !== "success" && nextProps.params.tab === "success") {
      this.setState({ currentTab: "success" })
    }
  }

  componentWillUnmount() {
    this.props.resetMyInvestorQuestionnaire()
  }

  changeTab(tab) {
    if (tab) {
      const { router } = this.props
      scrollTop()
      this.setState({ currentTab: tab })
      router.push(`/my/investor-validations/suitability/${tab}`)
    }
  }

  renderTab() {
    const { router } = this.props
    const { currentTab } = this.state

    return (
      <SharedInvestorSuitability
        currentTab={currentTab}
        router={router}
        changeTab={this.changeTab}
      />
    )
  }

  render() {
    const { gMyInvestorQuestionnaireInProcess } = this.props
    const { currentTab, order } = this.state

    if (gMyInvestorQuestionnaireInProcess) return <LoadingSpinner />

    return (
      <div id="my-investors-validations-suitability">
        {
          currentTab !== "success" && <SharedOthersTabNav order={order} currentTab={currentTab} handleClick={this.changeTab} />
        }

        { this.renderTab() }
      </div>
    )
  }
}
