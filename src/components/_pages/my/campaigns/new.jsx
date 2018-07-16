import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupQuestionnaire, C_MY_STARTUP_QUESTIONNAIRE,
} from '../../../../actions/my/startup-questionnaires'

import MyStartupQuestionnairesBasicForm from '../../../forms/my/startup-questionnaires/basic'

const mapStateToProps = (state) => {
  return {
    cMyStartupQuestionnaireInProcess: _.get(state.requestStatus, C_MY_STARTUP_QUESTIONNAIRE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupQuestionnaire: bindActionCreators(cMyStartupQuestionnaire, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsNew extends Component {
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
        }
      ],
      currentTab: 'basic',
      disableNav: true
    }

    this.cMyStartupQuestionnaire = this.cMyStartupQuestionnaire.bind(this)
  }

  cMyStartupQuestionnaire(values) {
    this.props.cMyStartupQuestionnaire({ basic: values }, (data) => {
      this.props.router.push(`/my/campaigns/${data.campaign.id}/edit/teaser`)
    })
  }

  render() {
    const { currentTab, disableNav } = this.state

    return (
      <div id="my-campaigns-new">
        <div className="tab-nav">
          <div className="container">
            {
              this.state.order.map((t, i) => {
                const bgColor = currentTab === t.key ? "active" : ""
                const disabledClass = disableNav ? "disabled" : "pointer"
                return (
                  <div
                    key={i}
                    className={`tab-item ${bgColor} ${disabledClass}`}
                  >{t.title}</div>
                )
              })
            }
          </div>
        </div>

        <MyStartupQuestionnairesBasicForm
          newMode
          initialValues={{
            founded_year: moment().toDate(),
            hashtags: []
          }}
          onSubmit={this.cMyStartupQuestionnaire}
          submitInProcess={this.props.cMyStartupQuestionnaireInProcess}
          optClass="col-xs-12 col-sm-6 col-sm-offset-3"
        />
      </div>
    )
  }
}
