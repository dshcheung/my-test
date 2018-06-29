import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getQuestionnaire } from '../../../../services/utils'

import {
  G_MY_STARTUP_QUESTIONNAIRES,
  U_MY_STARTUP_QUESTIONNAIRE, uMyStartupQuestionnaire
} from '../../../../actions/my/startup-questionnaires'

import {
  G_IMMOVABLE_ATTACHMENT_OPTIONS
} from '../../../../actions/immovables'

import LoadingSpinner from '../../../shared/loading-spinner'

import MyStartupQuestionnairesBasicForm from '../../../forms/my/startup-questionnaires/basic'
import MyStartupQuestionnairesTeaserForm from '../../../forms/my/startup-questionnaires/teaser'
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
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedMyCampaignsQuestionnaires extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "basic",
          dataKey: "startup_questionnaire_basic",
          model: MyStartupQuestionnairesBasicForm,
          formatValues: (q) => {
            const founded = _.get(q, "founded")
            _.set(q, 'founded', founded ? moment(founded).toDate() : moment().toDate())

            return q
          }
        },
        {
          key: "teaser",
          dataKey: "startup_questionnaire_teaser",
          model: MyStartupQuestionnairesTeaserForm,
          formatValues: (q) => {
            const cv = _.get(q, 'startup_questionnaire_achievements')
            if (cv) {
              const nv = cv.map((v) => {
                const occurredOn = _.get(v, "occurred_on")
                return {
                  ...v,
                  occurred_on: occurredOn ? moment(occurredOn).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_achievements', nv)
            }

            return q
          }
        },
        {
          key: "market",
          dataKey: "startup_questionnaire_market",
          model: MyStartupQuestionnairesMarketForm
        },
        {
          key: "strategy",
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
          dataKey: "startup_questionnaire_team",
          model: MyStartupQuestionnairesTeamForm
        },
        {
          key: "financial",
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
          dataKey: "startup_questionnaire_investment",
          model: MyStartupQuestionnairesInvestmentForm
        },
        {
          key: "attachments",
          dataKey: "attachments",
          model: MyStartupQuestionnairesAttachmentsForm,
          formatValues: (q) => {
            const cv = { attachments: q || [] }
            return cv
          },
          allAttachmentOptions: true
        }
      ],
    }

    this.uMyStartupQuestionnaire = this.uMyStartupQuestionnaire.bind(this)
    this.dMSQAttributes = this.dMSQAttributes.bind(this)
  }

  uMyStartupQuestionnaire(values) {
    this.props.uMyStartupQuestionnaire({
      [this.props.currentTab]: values
    }, null, {
      ...this.props.routeParams,
      startupQuestionnaireID: this.props.myQuestionnaires.id
    })
  }

  dMSQAttributes(index, fields, key) {
    const fieldValues = fields.get(index)
    const fieldID = _.get(fieldValues, 'id', null)

    if (fieldID) {
      const { myQuestionnaires, currentTab } = this.props
      const { order } = this.state

      const dataKey = _.find(order, { key: currentTab }).dataKey
      const myQuestionnaire = myQuestionnaires[`${dataKey}`]

      const params = {
        [this.state.currentTab]: {
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

  render() {
    const {
      currentTab, attachmentOptions, myQuestionnaires,
      gMyStartupQuestionnairesInProcess, gImmovableInProcess
    } = this.props
    const { order } = this.state

    if (gMyStartupQuestionnairesInProcess || gImmovableInProcess) return <LoadingSpinner />

    const baseInfo = _.find(order, { key: currentTab })

    const myQuestionnaire = myQuestionnaires[baseInfo.dataKey]
    const formatValues = baseInfo.formatValues
    const initialValues = formatValues ? formatValues(myQuestionnaire || {}) : myQuestionnaire

    return (
      <baseInfo.model
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
}
