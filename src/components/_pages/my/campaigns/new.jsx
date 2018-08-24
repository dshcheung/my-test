import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupQuestionnaire, C_MY_STARTUP_QUESTIONNAIRE,
} from '../../../../actions/my/startup-questionnaires'


import SharedOthersSideTitle from '../../../shared/others/side-title'
import SharedOthersIntro from '../../../shared/others/intro'
import SharedOthersTabNav from '../../../shared/others/tab-nav'

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
          key: "duediligence",
          title: "Due Diligence"
        },
        {
          key: "submission",
          title: "Submission"
        }
      ],
      currentTab: 'basic',
      disableNav: true,
      intro: true
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
    const { currentTab, disableNav, intro, order } = this.state

    return (
      <div id="my-campaigns-new" className={!intro && "remove-body-top-padding"}>
        {
          !intro && <SharedOthersTabNav order={order} currentTab={currentTab} disableNav={disableNav} />
        }

        <div className="row">
          <SharedOthersSideTitle title="startup" optClass={`hidden-xs hidden-sm col-md-offset-1 col-md-2`} number={intro ? '' : 1} />

          {
            intro && (
              <SharedOthersIntro
                optClass="col-sm-10 col-sm-offset-1 col-md-offset-0 col-md-8"
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
                optClass="col-sm-10 col-sm-offset-1 col-md-offset-0 col-md-8"
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
