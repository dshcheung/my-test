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
import MyStartupQuestionnairesProductForm from '../../../forms/my/startup-questionnaires/product'
import MyStartupQuestionnairesMarketForm from '../../../forms/my/startup-questionnaires/market'
import MyStartupQuestionnairesTeamForm from '../../../forms/my/startup-questionnaires/team'
import MyStartupQuestionnairesFinancialForm from '../../../forms/my/startup-questionnaires/financial'
import MyStartupQuestionnairesCampaignForm from '../../../forms/my/startup-questionnaires/campaign'
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
          prevTab: null,
          nextTab: "teaser",
          formatValues: (q) => {
            const founded = _.get(q, "founded_year")
            _.set(q, 'founded_year', founded ? moment(founded).toDate() : moment().toDate())

            const hashtags = _.get(q, "hashtags")
            _.set(q, 'hashtags', hashtags || [])

            return q
          }
        },
        {
          key: "teaser",
          dataKey: "startup_questionnaire_teaser",
          model: MyStartupQuestionnairesTeaserForm,
          prevTab: "basic",
          nextTab: "product",
          formatValues: (q) => {
            const cv = _.get(q, 'startup_questionnaire_highlights')
            if (cv) {
              const nv = cv.map((v) => {
                const occurredOn = _.get(v, "occurred_on")
                return {
                  ...v,
                  occurred_on: occurredOn ? moment(occurredOn).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_highlights', nv)
            }

            return q
          }
        },
        {
          key: "product",
          dataKey: "startup_questionnaire_product",
          model: MyStartupQuestionnairesProductForm,
          prevTab: "teaser",
          nextTab: "market",
          formatValues: (q) => {
            const cv = _.get(q, 'startup_questionnaire_patents')
            if (cv) {
              const nv = cv.map((v) => {
                const date = _.get(v, "registration_date")
                return {
                  ...v,
                  registration_date: date ? moment(date).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_patents', nv)
            }

            return q
          }
        },
        {
          key: "market",
          dataKey: "startup_questionnaire_market",
          model: MyStartupQuestionnairesMarketForm,
          prevTab: "product",
          nextTab: "team",
          formatValues: (q) => {
            const cv = _.get(q, 'go_to_market_strategies')
            if (cv) {
              const nv = cv.map((v) => {
                const date = _.get(v, "occurs_on")
                return {
                  ...v,
                  occurs_on: date ? moment(date).toDate() : moment().toDate()
                }
              })

              _.set(q, 'go_to_market_strategies', nv)
            }

            return q
          }
        },
        {
          key: "team",
          dataKey: "startup_questionnaire_team",
          model: MyStartupQuestionnairesTeamForm,
          prevTab: "market",
          nextTab: "financial",
        },
        {
          key: "financial",
          dataKey: "startup_questionnaire_financial",
          model: MyStartupQuestionnairesFinancialForm,
          prevTab: "team",
          nextTab: "campaign",
          formatValues: (q) => {
            const cv = _.get(q, 'startup_questionnaire_financial_fund_histories')
            if (cv) {
              const nv = cv.map((v) => {
                const occurredOn = _.get(v, "occurred_on")
                return {
                  ...v,
                  occurred_on: occurredOn ? moment(occurredOn).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_financial_fund_histories', nv)
            }

            const cv2 = _.get(q, 'startup_questionnaire_cap_tables')
            if (cv2) {
              const nv2 = cv2.map((v) => {
                const date = _.get(v, "date_of_investment_as_i")
                return {
                  ...v,
                  date_of_investment: date ? moment(date).toDate() : moment().toDate()
                }
              })

              _.set(q, 'startup_questionnaire_cap_tables', nv2)
            }

            const cv3 = _.get(q, 'startup_questionnaire_break_even')
            if (cv3 && !cv3.length) {
              const nv3 = { ...cv3, year: cv3.year ? moment(cv3.year).toDate() : moment().toDate() }
              _.set(q, 'startup_questionnaire_break_even', [nv3])
            }

            const cv4 = _.get(q, 'startup_questionnaire_cash_burns')
            if (cv4 && !cv4.length) {
              const money = _.get(cv4, 'money')
              const amount = _.get(money, 'amount') || ''
              const nv4 = { ...cv4, money: { ...money, amount } }

              _.set(q, 'startup_questionnaire_cash_burns', [nv4])
            }

            return q
          }
        },
        {
          key: "campaign",
          dataKey: "startup_questionnaire_campaign",
          model: MyStartupQuestionnairesCampaignForm,
          prevTab: "financial",
          nextTab: "attachments"
        },
        {
          key: "dataroom",
          dataKey: "attachments",
          model: MyStartupQuestionnairesAttachmentsForm,
          prevTab: "campaign",
          nextTab: null,
          formatValues: (q) => {
            const cv = { attachments: q || [] }
            return cv
          },
          allAttachmentOptions: true
        }
      ]
    }

    this.uMyStartupQuestionnaire = this.uMyStartupQuestionnaire.bind(this)
    this.dMSQAttributes = this.dMSQAttributes.bind(this)
  }

  uMyStartupQuestionnaire(values) {
    const baseInfo = _.find(this.state.order, { key: this.props.currentTab })

    this.props.uMyStartupQuestionnaire({
      [this.props.currentTab]: values
    }, () => {
      this.props.changeTab(baseInfo.nextTab)
    }, {
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
      const myQuestionnaire = _.get(myQuestionnaires, dataKey, {})

      const params = {
        [this.props.currentTab]: {
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

  // TODO: add next and previous button to forms
  render() {
    const {
      currentTab, attachmentOptions, myQuestionnaires,
      gMyStartupQuestionnairesInProcess, gImmovableInProcess
    } = this.props
    const { order } = this.state

    if (gMyStartupQuestionnairesInProcess || gImmovableInProcess) return <LoadingSpinner />

    const baseInfo = _.find(order, { key: currentTab })

    const myQuestionnaire = _.get(myQuestionnaires, baseInfo.dataKey, {})
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
