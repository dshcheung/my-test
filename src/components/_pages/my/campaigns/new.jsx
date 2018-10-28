import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupQuestionnaire, C_MY_STARTUP_QUESTIONNAIRE,
} from '../../../../actions/my/startup-questionnaires'


import SharedOthersSideTitle from '../../../shared/others/side-title'
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
      <div id="my-campaigns-new" className={intro && "margin-top-50 margin-bottom-20 clearfix"}>
        {
          !intro && <SharedOthersTabNav order={order} currentTab={currentTab} disableNav={disableNav} />
        }

        <SharedOthersSideTitle title="startup" optClass={`hidden-xs hidden-sm col-md-2 col-md-offset-1`} number={intro ? '' : 1} />

        {
          intro && (
            <div className="col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-0">
              <div className="h1 page-title-c fw-500 fs-28">WHAT WE NEED FROM YOU</div>

              <div className="row margin-bottom-20">
                <div className="col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1">
                  <img className="img-responsive" src="https://image.ibb.co/i07zYU/Screen_Shot_2018_08_31_at_2_03_56_AM.png" alt="guide" />
                </div>
              </div>

              <button
                className="btn btn-primary text-uppercase pull-right"
                onClick={this.onContinue}
              >Continue</button>
            </div>
          )
        }

        {
          !intro && (
            <MyStartupQuestionnairesBasicNewForm
              optClass="col-sm-10 col-sm-offset-1 col-md-offset-0 col-md-8 col-lg-offset-0 col-lg-6"
              onSubmit={this.cMyStartupQuestionnaire}
              submitInProcess={this.props.cMyStartupQuestionnaireInProcess}
            />
          )
        }
      </div>
    )
  }
}
