import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getQuestionnaire, scrollTop } from '../../../../services/utils'
import {
  G_MY_QUESTIONNAIRES, gMyQuestionnaires, resetMyQuestionnaires
} from '../../../../actions/my/questionnaires'

import {
  U_MY_STARTUP_QUESTIONNAIRE, uMyStartupQuestionnaire,
} from '../../../../actions/my/startup-questionnaires'

import LoadingSpinner from '../../../shared/loading-spinner'
import MyStartupQuestionnairesHighlightForm from '../../../forms/my/startup-questionnaires/highlights'
import MyStartupQuestionnairesOverviewForm from '../../../forms/my/startup-questionnaires/overview'
import MyStartupQuestionnairesMarketForm from '../../../forms/my/startup-questionnaires/market'
import MyStartupQuestionnairesStrategyForm from '../../../forms/my/startup-questionnaires/strategy'
import MyStartupQuestionnairesTeamForm from '../../../forms/my/startup-questionnaires/team'
import MyStartupQuestionnairesFinancialForm from '../../../forms/my/startup-questionnaires/financial'
import MyStartupQuestionnairesInvestmentForm from '../../../forms/my/startup-questionnaires/investment'

const mapStateToProps = (state, props) => {
  const myCampaignID = _.get(props, 'routeParams.myCampaignID')

  return {
    myQuestionnaires: getQuestionnaire(_.get(state, 'myQuestionnaires.startup_questionnaires', []), myCampaignID),
    gMyQuestionnairesInProcess: _.get(state.requestStatus, G_MY_QUESTIONNAIRES),
    uMyStartupQuestionnaireInProcess: _.get(state.requestStatus, U_MY_STARTUP_QUESTIONNAIRE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyStartupQuestionnaire: bindActionCreators(uMyStartupQuestionnaire, dispatch),
    gMyQuestionnaires: bindActionCreators(gMyQuestionnaires, dispatch),
    resetMyQuestionnaires: bindActionCreators(resetMyQuestionnaires, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedMyCampaignsStageTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "highlight",
          title: "Highlights",
          dataKey: "startup_questionnaire_highlight",
          model: MyStartupQuestionnairesHighlightForm
        },
        {
          key: "overview",
          title: "Overview",
          dataKey: "startup_questionnaire_overview",
          model: MyStartupQuestionnairesOverviewForm,
          formatValues: (q) => {
            const cv = _.get(q, 'startup_questionnaire_past_milestones')
            if (cv) {
              const nv = cv.map((v) => {
                const occurredOn = _.get(v, "occurred_on")
                return {
                  ...v,
                  occurred_on: occurredOn ? moment(occurredOn).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_past_milestones', nv)
            }

            return q
          }
        },
        {
          key: "market",
          title: "Market",
          dataKey: "startup_questionnaire_market",
          model: MyStartupQuestionnairesMarketForm,
          formatValues: (q) => {
            const cv = _.get(q, 'market_metrics')
            if (cv) _.set(q, 'market_metrics_url', cv.original)

            return q
          }
        },
        {
          key: "strategy",
          title: "Strategy",
          dataKey: "startup_questionnaire_strategy",
          model: MyStartupQuestionnairesStrategyForm,
          formatValues: (q) => {
            const cv = _.get(q, 'startup_questionnaire_market_strategies')
            if (cv) {
              const nv = cv.map((v) => {
                const occurredOn = _.get(v, "planned_for")
                return {
                  ...v,
                  planned_for: occurredOn ? moment(occurredOn).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_market_strategies', nv)
            }

            return q
          }
        },
        {
          key: "team",
          title: "Team",
          dataKey: "startup_questionnaire_team",
          model: MyStartupQuestionnairesTeamForm
        },
        {
          key: "financial",
          title: "Financials",
          dataKey: "startup_questionnaire_financial",
          model: MyStartupQuestionnairesFinancialForm,
          formatValues: (q) => {
            const cv1 = _.get(q, 'break_even')
            if (cv1) _.set(q, 'break_even_url', cv1.original)
            const cv2 = _.get(q, 'income_statements')
            if (cv2) _.set(q, 'income_statements_url', cv2.original)
            const cv3 = _.get(q, 'cash_flow_statements')
            if (cv3) _.set(q, 'cash_flow_statements_url', cv3.original)

            return q
          }
        },
        {
          key: "investment",
          title: "Investment Proposition",
          dataKey: "startup_questionnaire_investment",
          model: MyStartupQuestionnairesInvestmentForm
        },
      ],
      currentStage: "financial"
    }

    this.uMyStartupQuestionnaire = this.uMyStartupQuestionnaire.bind(this)
    this.dMSQAttributes = this.dMSQAttributes.bind(this)
    this.setNextStage = this.setNextStage.bind(this)
  }

  componentWillMount() {
    this.props.gMyQuestionnaires()
  }

  componentWillUnmount() {
    this.props.resetMyQuestionnaires()
  }

  setNextStage() {
    const { order, currentStage } = this.state

    const nextIndex = _.findIndex(order, (o) => {
      return o.key === currentStage
    }) + 1
    const nextStage = order[nextIndex]

    if (nextStage) {
      this.changeStage(nextStage.key)
    } else {
      this.props.changeStage("stage_three")
    }
  }

  changeStage(stage) {
    scrollTop()
    this.setState({ currentStage: stage })
  }

  uMyStartupQuestionnaire(values) {
    this.props.uMyStartupQuestionnaire({
      [this.state.currentStage]: values
    }, () => {
      this.setNextStage()
    }, {
      ...this.props.routeParams,
      startupQuestionnaireID: this.props.myQuestionnaires.id
    })
  }

  dMSQAttributes(index, fields, key) {
    const fieldValues = fields.get(index)
    const fieldID = _.get(fieldValues, 'id', null)

    if (fieldID) {
      const { myQuestionnaires } = this.props
      const { order, currentStage } = this.state

      const dataKey = _.find(order, { key: currentStage }).dataKey
      const myQuestionnaire = myQuestionnaires[`${dataKey}`]

      const params = {
        [this.state.currentStage]: {
          id: _.get(myQuestionnaire, 'id', null),
          [key.split("[")[0]]: [{
            id: _.get(fields.get(index), 'id', null),
            _destroy: true
          }]
        }
      }

      this.props.uMyStartupQuestionnaire(params, () => {
        // fields.remove(index)
      }, {
        ...this.props.routeParams,
        startupQuestionnaireID: this.props.myQuestionnaires.id
      })
    } else {
      fields.remove(index)
    }
  }

  questionnaireForm(myQuestionnaire, baseInfo) {
    const formatValues = baseInfo.formatValues
    const initialValues = formatValues ? formatValues(myQuestionnaire) : myQuestionnaire

    return (
      <baseInfo.model
        key={baseInfo.key}
        initialValues={initialValues}
        baseInfo={baseInfo}
        onSubmit={this.uMyStartupQuestionnaire}
        dMSQAttributes={this.dMSQAttributes}
        submitInProcess={this.props.uMyStartupQuestionnaireInProcess}
        optClass="col-xs-12 col-sm-6 col-sm-offset-3"
      />
    )
  }

  render() {
    const { myQuestionnaires, gMyQuestionnairesInProcess } = this.props
    const { currentStage } = this.state

    if (gMyQuestionnairesInProcess) return <LoadingSpinner />

    return (
      <div id="shared-my-campaigns-stage-two">
        <div className="stage-nav">
          <div className="container">
            {
              this.state.order.map((o, i) => {
                const bgColor = currentStage === o.key ? "bg-info" : ""
                return (
                  <div
                    key={i}
                    className={`pointer stage-item ${bgColor}`}
                    onClick={() => {
                      this.changeStage(o.key)
                    }}
                  >{o.title.splitCap("_")}</div>
                )
              })
            }
          </div>
        </div>

        {
          myQuestionnaires && this.state.order.map((o) => {
            return currentStage === o.key ? this.questionnaireForm(myQuestionnaires[o.dataKey], o) : null
          })
        }
      </div>
    )
  }
}
