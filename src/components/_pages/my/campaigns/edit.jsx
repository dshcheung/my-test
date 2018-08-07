import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaign
} from '../../../../actions/my/campaigns'

import {
  gMyStartupQuestionnaire, resetMyStartupQuestionnaire
} from '../../../../actions/my/startup-questionnaires'

import {
  gImmovable, resetImmovable
} from '../../../../actions/immovables'

import { notyWarning } from '../../../../services/noty'
import { scrollTop } from '../../../../services/utils'

import SharedStartupQuestionnaires from '../../../shared/startup-questionnaires'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaign: bindActionCreators(gMyCampaign, dispatch),
    gMyStartupQuestionnaire: bindActionCreators(gMyStartupQuestionnaire, dispatch),
    resetMyStartupQuestionnaire: bindActionCreators(resetMyStartupQuestionnaire, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaigns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "basic",
          title: "Basic",
        },
        {
          key: "teaser",
          title: "Teaser",
        },
        {
          key: "product",
          title: "Product"
        },
        {
          key: "market",
          title: "Market"
        },
        {
          key: "team",
          title: "Team"
        },
        {
          key: "financial",
          title: "Financial"
        },
        {
          key: "campaign",
          title: "Campaign"
        },
        {
          key: "dataroom",
          title: "Dataroom"
        },
        {
          key: 'submission',
          title: "Submission"
        }
      ],
      currentTab: props.params.tab
    }

    this.changeTab = this.changeTab.bind(this)
  }

  componentWillMount() {
    this.permitRedirection(this.props)
    this.props.gMyStartupQuestionnaire({
      queries: { campaign_id: this.props.myCampaign.id },
      params: { startupQuestionnaireID: null }
    })
    this.props.gImmovable({ immovableID: "attachment_options" })
    this.props.gImmovable({ immovableID: "hashtag_options" })
    this.props.gImmovable({ immovableID: "startup_questionnaire_cap_table_options" })
    this.props.gImmovable({ immovableID: "startup_questionnaire_basic_options" })
  }

  componentWillReceiveProps(nextProps) {
    this.permitRedirection(nextProps)
    if (this.props.params.tab !== "success" && nextProps.params.tab === "success") {
      this.setState({ currentTab: "success" })
    }
  }

  componentWillUnmount() {
    this.props.resetMyStartupQuestionnaire()
    this.props.resetImmovable()
  }

  permitRedirection(props) {
    if (props.params.tab !== "success" &&
      props.myCampaign &&
      !props.myCampaign.can.edit) {
      this.props.router.push("/my/campaigns")
      notyWarning("You Cannot Edit")
    }
  }

  changeTab(tab) {
    if (tab) {
      const { router } = this.props
      scrollTop()
      this.setState({ currentTab: tab })
      router.push(`/my/campaigns/${router.params.myCampaignID}/edit/${tab}`)
    }
  }

  renderTab() {
    const { router, router: { params }, myCampaign } = this.props
    const { currentTab } = this.state
    const routeParams = { ...params, myStartupID: _.get(myCampaign, 'startup.id') }

    return (
      <SharedStartupQuestionnaires
        currentTab={currentTab}
        routeParams={routeParams}
        router={router}
        changeTab={this.changeTab}
      />
    )
  }

  render() {
    const { myCampaign } = this.props
    const { currentTab } = this.state

    if (myCampaign && !myCampaign.can.edit && currentTab !== "success") {
      return null
    }

    return (
      <div id="my-campaigns-edit" className={currentTab !== "success" && "remove-body-top-padding"}>
        {
          currentTab !== "success" && (
            <div className="tab-nav">
              <div className="container">
                {
                  this.state.order.map((t, i) => {
                    const bgColor = currentTab === t.key ? "active" : ""
                    return (
                      <div
                        key={i}
                        className={`pointer tab-item ${bgColor}`}
                        onClick={() => {
                          this.changeTab(t.key)
                        }}
                      >{t.title}</div>
                    )
                  })
                }
              </div>
            </div>
          )
        }

        { this.renderTab() }
      </div>
    )
  }
}
