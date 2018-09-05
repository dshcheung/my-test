import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { notyError } from '../../../services/noty'

import {
  G_MY_STARTUP_QUESTIONNAIRE,
  U_MY_STARTUP_QUESTIONNAIRE, uMyStartupQuestionnaire,
  D_MY_STARTUP_QUESTIONNAIRE_ATTRIBUTE, dMyStartupQuestionnaireAttribute
} from '../../../actions/my/startup-questionnaires'

import {
  G_IMMOVABLE_ATTACHMENT_OPTIONS, G_IMMOVABLE_HASHTAG_OPTIONS, G_IMMOVABLE_STARTUP_QUESTIONNAIRE_CAP_TABLE_OPTIONS
} from '../../../actions/immovables'

import LoadingSpinner from '../../shared/others/loading-spinner'
import SharedOthersSideTitle from '../../shared/others/side-title'

import MyStartupQuestionnairesBasicEditForm from '../../forms/my/startup-questionnaires/basic-edit'
import MyStartupQuestionnairesTeaserForm from '../../forms/my/startup-questionnaires/teaser'
import MyStartupQuestionnairesProductForm from '../../forms/my/startup-questionnaires/product'
import MyStartupQuestionnairesMarketForm from '../../forms/my/startup-questionnaires/market'
import MyStartupQuestionnairesTeamForm from '../../forms/my/startup-questionnaires/team'
import MyStartupQuestionnairesFinancialForm from '../../forms/my/startup-questionnaires/financial'
import MyStartupQuestionnairesCampaignForm from '../../forms/my/startup-questionnaires/campaign'
import MyStartupQuestionnairesAttachmentsForm from '../../forms/my/startup-questionnaires/attachments'
import SharedStartupQuestionnairesSubmission from './submission'
import SharedStartupQuestionnairesSuccess from './success'

const mapStateToProps = (state) => {
  return {
    myStartupQuestionnaire: _.get(state, 'myStartupQuestionnaire', {}),
    gMyStartupQuestionnaireInProcess: _.get(state.requestStatus, G_MY_STARTUP_QUESTIONNAIRE),
    uMyStartupQuestionnaireInProcess: _.get(state.requestStatus, U_MY_STARTUP_QUESTIONNAIRE),
    dMyStartupQuestionnaireAttributeInProcess: _.get(state.requestStatus, D_MY_STARTUP_QUESTIONNAIRE_ATTRIBUTE),
    gAttachmentOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_ATTACHMENT_OPTIONS),
    gHashtagOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_HASHTAG_OPTIONS),
    gCapTableOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_STARTUP_QUESTIONNAIRE_CAP_TABLE_OPTIONS),
    attachmentOptions: _.get(state, 'immovables.attachment_options', []),
    hashtagOptions: _.get(state, 'immovables.startup_questionnaire_hashtag_options', []),
    capTableOptions: _.get(state, 'immovables.startup_questionnaire_cap_table_options', []),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyStartupQuestionnaire: bindActionCreators(uMyStartupQuestionnaire, dispatch),
    dMyStartupQuestionnaireAttribute: bindActionCreators(dMyStartupQuestionnaireAttribute, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupQuestionnaires extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        {
          key: "basic",
          dataKey: "startup_questionnaire_basic",
          model: MyStartupQuestionnairesBasicEditForm,
          nextTab: "teaser",
          formatValues: (q) => {
            const year = _.get(q, 'founded_year')
            const nq = {
              ...q,
              company_name: _.get(q, 'company_name') || '',
              country_of_incorporation: _.get(q, 'country_of_incorporation') || '',
              founded_year: year ? moment(year, "YYYY").toDate() : '',
              hashtags: _.get(q, 'hashtags') || '',
              tagline: _.get(q, 'tagline') || '',
              vertical: _.get(q, 'vertical') || '',
              attachments: _.get(q, 'attachments') || []
            }

            return nq
          }
        },
        {
          key: "teaser",
          dataKey: "startup_questionnaire_teaser",
          model: MyStartupQuestionnairesTeaserForm,
          nextTab: "product",
          formatValues: (q) => {
            const startup_questionnaire_highlights = _.get(q, 'startup_questionnaire_highlights') || []
            const startup_questionnaire_media = _.get(q, 'startup_questionnaire_media') || []

            const nq = {
              ...q,
              make_money: _.get(q, 'make_money') || '',
              problem: _.get(q, 'problem') || '',
              solution: _.get(q, 'solution') || '',
              solution_benchmark: _.get(q, 'solution_benchmark') || '',
              startup_questionnaire_highlights: startup_questionnaire_highlights.map((h) => {
                const occurred_on = _.get(h, "occurred_on")

                return {
                  ...h,
                  occurred_on: occurred_on ? moment(occurred_on).toDate() : ''
                }
              }),
              startup_questionnaire_media,
              attachments: _.get(q, 'attachments') || []
            }

            return nq
          }
        },
        {
          key: "product",
          dataKey: "startup_questionnaire_product",
          model: MyStartupQuestionnairesProductForm,
          nextTab: "market",
          formatValues: (q) => {
            const startup_questionnaire_patents = _.get(q, 'startup_questionnaire_patents') || []

            const nq = {
              ...q,
              product: _.get(q, 'product') || '',
              startup_questionnaire_patents: startup_questionnaire_patents.map((p) => {
                const registration_date = _.get(p, 'registration_date')
                return {
                  ...p,
                  registration_date: registration_date ? moment(registration_date).toDate() : ''
                }
              })
            }

            return nq
          }
        },
        {
          key: "market",
          dataKey: "startup_questionnaire_market",
          model: MyStartupQuestionnairesMarketForm,
          nextTab: "team",
          formatValues: (q) => {
            const startup_questionnaire_go_to_market_strategies = _.get(q, 'startup_questionnaire_go_to_market_strategies') || []

            const nq = {
              ...q,
              barriers_to_entry: _.get(q, 'barriers_to_entry') || '',
              competition_landscape: _.get(q, 'competition_landscape') || '',
              global_market: _.get(q, 'global_market') || '',
              solution_benchmark: _.get(q, 'solution_benchmark') || '',
              target_market: _.get(q, 'target_market') || '',
              traction: _.get(q, 'traction') || '',
              startup_questionnaire_go_to_market_strategies: startup_questionnaire_go_to_market_strategies.map((s) => {
                const occurs_on = _.get(s, 'occurs_on')
                return {
                  ...s,
                  occurs_on: occurs_on ? moment(occurs_on).toDate() : ''
                }
              })
            }

            return nq
          }
        },
        {
          key: "team",
          dataKey: "startup_questionnaire_team",
          model: MyStartupQuestionnairesTeamForm,
          nextTab: "financial",
        },
        {
          key: "financial",
          dataKey: "startup_questionnaire_financial",
          model: MyStartupQuestionnairesFinancialForm,
          nextTab: "campaign",
          formatValues: (q) => {
            const startup_questionnaire_previous_funds = _.get(q, 'startup_questionnaire_previous_funds') || []
            const startup_questionnaire_cap_tables = _.get(q, 'startup_questionnaire_cap_tables') || []
            const startup_questionnaire_break_even = _.get(q, 'startup_questionnaire_break_even')
            const year = _.get(startup_questionnaire_break_even, 'year')
            _.set(startup_questionnaire_break_even, 'year', year ? moment(year).toDate() : '')

            const nq = {
              ...q,
              startup_questionnaire_previous_funds: startup_questionnaire_previous_funds.map((pf) => {
                const occurred_on = _.get(pf, 'occurred_on')
                return {
                  ...pf,
                  occurred_on: occurred_on ? moment(occurred_on).toDate() : ''
                }
              }),
              startup_questionnaire_cap_tables: startup_questionnaire_cap_tables.map((ct) => {
                const date_of_investment = _.get(ct, 'date_of_investment')
                return {
                  ...ct,
                  date_of_investment: date_of_investment ? moment(date_of_investment).toDate() : ''
                }
              }),
              startup_questionnaire_break_even,
              cash_burn: {
                ..._.get(q, 'cash_burn'),
                amount: _.get(q, 'cash_burn.amount') || ''
              }
            }

            return nq
          }
        },
        {
          key: "campaign",
          dataKey: "startup_questionnaire_campaign",
          model: MyStartupQuestionnairesCampaignForm,
          nextTab: "duediligence",
          formatValues: (q) => {
            const nq = {
              ...q,
              maturity_date: _.get(q, 'maturity_date') ? moment(_.get(q, 'maturity_date')).toDate() : '',
              pre_money_valuation: {
                ..._.get(q, 'pre_money_valuation'),
                amount: _.get(q, 'pre_money_valuation.amount') || ''
              },
              raised: {
                ..._.get(q, 'raised'),
                amount: _.get(q, 'raised.amount') || ''
              },
              valuation_cap: {
                ..._.get(q, 'valuation_cap'),
                amount: _.get(q, 'valuation_cap.amount') || ''
              }
            }

            return nq
          }
        },
        {
          key: "duediligence",
          dataKey: "attachments",
          model: MyStartupQuestionnairesAttachmentsForm,
          nextTab: "submission",
          formatValues: (q) => {
            const nq = {
              attachments: q || []
            }
            return nq
          },
          allAttachmentOptions: true
        },
        {
          key: "submission",
          model: SharedStartupQuestionnairesSubmission,
          nextTab: null,
          nonForm: true
        }, {
          key: "success",
          model: SharedStartupQuestionnairesSuccess,
          nextTab: null,
          nonForm: true
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
      startupQuestionnaireID: this.props.myStartupQuestionnaire.id
    })
  }

  dMSQAttributes(value, key, cb) {
    const valueID = _.get(value, 'id', null)

    if (valueID) {
      const { myStartupQuestionnaire, currentTab } = this.props
      const { order } = this.state

      const dataKey = _.find(order, { key: currentTab }).dataKey
      const questionnairePiece = _.get(myStartupQuestionnaire, dataKey, {})

      const params = {
        [this.props.currentTab]: {
          id: _.get(questionnairePiece, 'id', null),
          [key.split("[")[0]]: [{
            id: valueID,
            _destroy: true
          }]
        }
      }

      this.props.dMyStartupQuestionnaireAttribute(params, cb, {
        ...this.props.routeParams,
        startupQuestionnaireID: this.props.myStartupQuestionnaire.id
      })
    } else {
      if (cb) cb()
    }
  }

  renderTab() {
    const {
      currentTab, attachmentOptions, hashtagOptions, capTableOptions, myStartupQuestionnaire,
    } = this.props
    const { order } = this.state
    const baseInfo = _.find(order, { key: currentTab })

    if (baseInfo.nonForm) {
      return <baseInfo.model routeParams={this.props.routeParams} />
    } else {
      const questionnairePiece = _.get(myStartupQuestionnaire, baseInfo.dataKey, {})
      const formatValues = baseInfo.formatValues
      const initialValues = formatValues ? formatValues(questionnairePiece || {}) : questionnairePiece

      return (
        <baseInfo.model
          initialValues={initialValues}
          baseInfo={baseInfo}
          onSubmit={this.uMyStartupQuestionnaire}
          onSubmitFail={() => {
            notyError("Submission failed - please review error messages and try again")
          }}
          dMSQAttributes={this.dMSQAttributes}
          submitInProcess={this.props.uMyStartupQuestionnaireInProcess || this.props.dMyStartupQuestionnaireAttributeInProcess}
          optClass="col-sm-10 col-sm-offset-1 col-md-offset-0 col-md-8"
          attachmentOptions={baseInfo.allAttachmentOptions ? attachmentOptions : _.filter(attachmentOptions, (o) => {
            return o.section === baseInfo.dataKey
          })}
          hashtagOptions={hashtagOptions}
          capTableOptions={capTableOptions}
        />
      )
    }
  }

  render() {
    const {
      gMyStartupQuestionnaireInProcess, gAttachmentOptionsInProcess, gHashtagOptionsInProcess, gCapTableOptionsInProcess
    } = this.props

    if (gMyStartupQuestionnaireInProcess || gAttachmentOptionsInProcess || gHashtagOptionsInProcess || gCapTableOptionsInProcess) return <LoadingSpinner />

    return (
      <div>
        <SharedOthersSideTitle title="startup" optClass="hidden-xs hidden-sm col-md-offset-1 col-md-2" number="1" />

        { this.renderTab() }
      </div>
    )
  }
}
