import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getQuestionnaire, scrollTop } from '../../../../services/utils'

import {
  G_MY_STARTUP_QUESTIONNAIRES, gMyStartupQuestionnaires,
  U_MY_STARTUP_QUESTIONNAIRE, uMyStartupQuestionnaire,
  resetMyStartupQuestionnaire
} from '../../../../actions/my/startup-questionnaires'

import {
  gImmovable, G_IMMOVABLE_ATTACHMENT_OPTIONS, resetImmovable
} from '../../../../actions/immovables'

import LoadingSpinner from '../../../shared/loading-spinner'
import MyStartupQuestionnairesHighlightForm from '../../../forms/my/startup-questionnaires/highlights'
import MyStartupQuestionnairesOverviewForm from '../../../forms/my/startup-questionnaires/overview'
import MyStartupQuestionnairesMarketForm from '../../../forms/my/startup-questionnaires/market'
import MyStartupQuestionnairesStrategyForm from '../../../forms/my/startup-questionnaires/strategy'
import MyStartupQuestionnairesTeamForm from '../../../forms/my/startup-questionnaires/team'
import MyStartupQuestionnairesFinancialForm from '../../../forms/my/startup-questionnaires/financial'
import MyStartupQuestionnairesInvestmentForm from '../../../forms/my/startup-questionnaires/investment'
import MyStartupQuestionnairesAttachmentsForm from '../../../forms/my/startup-questionnaires/attachments'

const mapStateToProps = (state, props) => {
  const myCampaignID = _.get(props, 'routeParams.myCampaignID')

  return {
    myQuestionnaires: getQuestionnaire(_.get(state, 'myStartupQuestionnaires', []), myCampaignID),
    gMyStartupQuestionnairesInProcess: _.get(state.requestStatus, G_MY_STARTUP_QUESTIONNAIRES),
    uMyStartupQuestionnaireInProcess: _.get(state.requestStatus, U_MY_STARTUP_QUESTIONNAIRE),
    gImmovableInProcess: _.get(state.requestStatus, G_IMMOVABLE_ATTACHMENT_OPTIONS),
    attachmentOptions: _.get(state, 'immovables.attachment_options', [])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyStartupQuestionnaire: bindActionCreators(uMyStartupQuestionnaire, dispatch),
    gMyStartupQuestionnaires: bindActionCreators(gMyStartupQuestionnaires, dispatch),
    resetMyStartupQuestionnaire: bindActionCreators(resetMyStartupQuestionnaire, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch),
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
          model: MyStartupQuestionnairesHighlightForm,
          formatValues: (q) => {
            const founded = _.get(q, "founded")
            _.set(q, 'founded', founded ? moment(founded).toDate() : moment().toDate())

            return q
          }
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
          model: MyStartupQuestionnairesMarketForm
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
                const plannedFor = _.get(v, "planned_for")
                return {
                  ...v,
                  planned_for: plannedFor ? moment(plannedFor).toDate() : moment().toDate()
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
            const cv = _.get(q, 'startup_questionnaire_financial_fund_histories')
            if (cv) {
              const nv4 = cv.map((v) => {
                const occurredOn = _.get(v, "occurred_on")
                return {
                  ...v,
                  occurred_on: occurredOn ? moment(occurredOn).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_financial_fund_histories', nv4)
            }

            return q
          }
        },
        {
          key: "investment",
          title: "Investment Proposition",
          dataKey: "startup_questionnaire_investment",
          model: MyStartupQuestionnairesInvestmentForm
        },
        {
          key: "attachments",
          title: "Due Diligence Document",
          dataKey: "attachments",
          model: MyStartupQuestionnairesAttachmentsForm,
          formatValues: (q) => {
            const cv = { attachments: q || [] }
            return cv
          },
          allAttachmentOptions: true
        }
      ],
      currentStage: "highlight"
    }

    this.uMyStartupQuestionnaire = this.uMyStartupQuestionnaire.bind(this)
    this.dMSQAttributes = this.dMSQAttributes.bind(this)
    this.setNextStage = this.setNextStage.bind(this)
  }

  componentWillMount() {
    this.props.gMyStartupQuestionnaires()
    this.props.gImmovable({ immovableID: "attachment_options" })
  }

  componentWillUnmount() {
    this.props.resetMyStartupQuestionnaire()
    this.props.resetImmovable()
  }

  setNextStage() {
    const { order, currentStage } = this.state

    const nextIndex = _.findIndex(order, (o) => {
      return o.key === currentStage
    }) + 1
    const nextStage = order[nextIndex]

    if (nextStage) {
      this.changeStage(nextStage.key)
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
        fields.remove(index)
      }, {
        ...this.props.routeParams,
        startupQuestionnaireID: this.props.myQuestionnaires.id
      })
    } else {
      fields.remove(index)
    }
  }

  questionnaireForm(myQuestionnaire, baseInfo) {
    const { attachmentOptions } = this.props
    const formatValues = baseInfo.formatValues
    const initialValues = formatValues ? formatValues(myQuestionnaire || {}) : myQuestionnaire

    return (
      <baseInfo.model
        key={baseInfo.key}
        initialValues={initialValues}
        baseInfo={baseInfo}
        onSubmit={this.uMyStartupQuestionnaire}
        dMSQAttributes={this.dMSQAttributes}
        submitInProcess={this.props.uMyStartupQuestionnaireInProcess}
        optClass="col-xs-12 col-sm-6 col-sm-offset-3"
        attachmentOptions={baseInfo.allAttachmentOptions ? attachmentOptions : _.filter(attachmentOptions, (o) => {
          return o.section === baseInfo.dataKey
        })}
      />
    )
  }

  render() {
    const { myQuestionnaires, gMyStartupQuestionnairesInProcess, gImmovableInProcess } = this.props
    const { currentStage } = this.state

    if (gMyStartupQuestionnairesInProcess || gImmovableInProcess) return <LoadingSpinner />

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
