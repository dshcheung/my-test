import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupQuestionnaire, C_MY_STARTUP_QUESTIONNAIRE,
} from '../../../../actions/my/startup-questionnaires'

import SharedOthersSideTitle from '../../../shared/others/side-title'
import SharedOthersIntro from '../../../shared/others/intro'

import MyStartupQuestionnairesBasicNewForm from '../../../forms/my/startup-questionnaires/basic-new'

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
        },
        {
          key: "submission",
          title: "Submission"
        }
      ],
      currentTab: 'basic',
      disableNav: true,
      intro: false
    }

    this.cMyStartupQuestionnaire = this.cMyStartupQuestionnaire.bind(this)
    this.onContinue = this.onContinue.bind(this)
  }

  onContinue() {
    this.setState({ intro: false })
  }

  cMyStartupQuestionnaire(values) {
    this.props.cMyStartupQuestionnaire({ basic: values }, (data) => {
      this.props.router.push(`/my/campaigns/${data.campaign.id}/edit/teaser`)
    })
  }

  render() {
    const { currentTab, disableNav, intro } = this.state

    return (
      <div id="my-campaigns-new" className={!intro && "remove-margin"}>
        {
          !intro && (
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
          )
        }

        <div className="row">
          <SharedOthersSideTitle title="startup" optClass="col-sm-3 col-md-4" />

          {
            intro && (
              <SharedOthersIntro
                optClass="col-sm-6 col-md-4"
                onContinue={this.onContinue}
                title="what we need from you"
                content={[
                  {
                    title: "Tell us about your Startup",
                    body: "all the details from a-z about your startup"
                  },
                  {
                    title: "Campaign profile",
                    body: "make your campaign stand out"
                  }
                ]}
              />
            )
          }

          {
            !intro && (
              <MyStartupQuestionnairesBasicNewForm
                optClass="col-sm-6 col-md-4"
                initialValues={{
                  hashtags: []
                }}
                onSubmit={this.cMyStartupQuestionnaire}
                submitInProcess={this.props.cMyStartupQuestionnaireInProcess}
              />
            )
          }
        </div>
      </div>
    )
  }
}
