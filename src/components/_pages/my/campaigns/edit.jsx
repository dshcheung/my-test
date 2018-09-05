import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaign
} from '../../../../actions/my/campaigns'

import {
  gMyStartupQuestionnaire, resetMyStartupQuestionnaire,
  G_MY_STARTUP_QUESTIONNAIRE,
  U_MY_STARTUP_QUESTIONNAIRE, uMyStartupQuestionnaire,
  D_MY_STARTUP_QUESTIONNAIRE_ATTRIBUTE, dMyStartupQuestionnaireAttribute
} from '../../../../actions/my/startup-questionnaires'

import {
  gImmovable, resetImmovable,
  G_IMMOVABLE_ATTACHMENT_OPTIONS, G_IMMOVABLE_HASHTAG_OPTIONS, G_IMMOVABLE_STARTUP_QUESTIONNAIRE_CAP_TABLE_OPTIONS
} from '../../../../actions/immovables'

import { notyWarning, notyError } from '../../../../services/noty'
import { scrollTop } from '../../../../services/utils'

import LoadingSpinner from '../../../shared/others/loading-spinner'
import SharedOthersTabNav from '../../../shared/others/tab-nav'
import SharedOthersSideTitle from '../../../shared/others/side-title'

import MyStartupQuestionnairesBasicEditForm from '../../../forms/my/startup-questionnaires/basic-edit'
import MyStartupQuestionnairesTeaserForm from '../../../forms/my/startup-questionnaires/teaser'
import MyStartupQuestionnairesProductForm from '../../../forms/my/startup-questionnaires/product'
import MyStartupQuestionnairesMarketForm from '../../../forms/my/startup-questionnaires/market'
import MyStartupQuestionnairesTeamForm from '../../../forms/my/startup-questionnaires/team'
import MyStartupQuestionnairesFinancialForm from '../../../forms/my/startup-questionnaires/financial'
import MyStartupQuestionnairesCampaignForm from '../../../forms/my/startup-questionnaires/campaign'
import MyStartupQuestionnairesAttachmentsForm from '../../../forms/my/startup-questionnaires/attachments'
import SharedStartupQuestionnairesSubmission from '../../../shared/startup-questionnaires/submission'
import SharedStartupQuestionnairesSuccess from '../../../shared/startup-questionnaires/success'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
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
    formValues: _.get(state, 'form')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaign: bindActionCreators(gMyCampaign, dispatch),
    gMyStartupQuestionnaire: bindActionCreators(gMyStartupQuestionnaire, dispatch),
    uMyStartupQuestionnaire: bindActionCreators(uMyStartupQuestionnaire, dispatch),
    dMyStartupQuestionnaireAttribute: bindActionCreators(dMyStartupQuestionnaireAttribute, dispatch),
    resetMyStartupQuestionnaire: bindActionCreators(resetMyStartupQuestionnaire, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch),

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
          dataKey: "startup_questionnaire_basic",
          model: MyStartupQuestionnairesBasicEditForm,
          modelKey: "MyStartupQuestionnairesBasicEditForm",
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
          title: "Teaser",
          dataKey: "startup_questionnaire_teaser",
          model: MyStartupQuestionnairesTeaserForm,
          modelKey: "MyStartupQuestionnairesTeaserForm",
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
          title: "Product",
          dataKey: "startup_questionnaire_product",
          model: MyStartupQuestionnairesProductForm,
          modelKey: "MyStartupQuestionnairesProductForm",
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
          title: "Market",
          dataKey: "startup_questionnaire_market",
          model: MyStartupQuestionnairesMarketForm,
          modelKey: "MyStartupQuestionnairesMarketForm",
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
          title: "Team",
          dataKey: "startup_questionnaire_team",
          model: MyStartupQuestionnairesTeamForm,
          modelKey: "MyStartupQuestionnairesTeamForm",
          nextTab: "financial",
        },
        {
          key: "financial",
          title: "Financial",
          dataKey: "startup_questionnaire_financial",
          model: MyStartupQuestionnairesFinancialForm,
          modelKey: "MyStartupQuestionnairesFinancialForm",
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
          title: "Campaign",
          dataKey: "startup_questionnaire_campaign",
          model: MyStartupQuestionnairesCampaignForm,
          modelKey: "MyStartupQuestionnairesCampaignForm",
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
          title: "Due Diligence",
          dataKey: "attachments",
          model: MyStartupQuestionnairesAttachmentsForm,
          modelKey: "MyStartupQuestionnairesAttachmentsForm",
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
          key: 'submission',
          title: "Submission",
          model: SharedStartupQuestionnairesSubmission,
          nextTab: null,
          nonForm: true
        },
        {
          key: "success",
          model: SharedStartupQuestionnairesSuccess,
          nextTab: null,
          nonForm: true
        }
      ],
      currentTab: props.params.tab,
      routeParams: {
        ...props.router.params,
        myStartupID: _.get(props, 'myCampaign.startup.id'),
        startupQuestionnaireID: _.get(props, 'myStartupQuestionnaire.id')
      }
    }

    this.handleSubmitFail = this.handleSubmitFail.bind(this)
    this.saveOnChangeTab = this.saveOnChangeTab.bind(this)
    this.changeTab = this.changeTab.bind(this)
    this.uMyStartupQuestionnaire = this.uMyStartupQuestionnaire.bind(this)
    this.dMSQAttributes = this.dMSQAttributes.bind(this)
  }

  componentWillMount() {
    this.permitRedirection(this.props)
    this.props.gMyStartupQuestionnaire({
      queries: { campaign_id: this.props.myCampaign.id },
      params: { startupQuestionnaireID: null }
    })
    this.props.gImmovable({ immovableID: "attachment_options" })
    this.props.gImmovable({ immovableID: "startup_questionnaire_hashtag_options" })
    this.props.gImmovable({ immovableID: "startup_questionnaire_cap_table_options" })
  }

  componentWillReceiveProps(nextProps) {
    this.permitRedirection(nextProps)
    if (this.props.params.tab !== "success" && nextProps.params.tab === "success") {
      this.setState({ currentTab: "success" })
    }

    if (!this.props.myStartupQuestionnaire && nextProps.myStartupQuestionnaire) {
      const { routeParams } = this.state
      this.setState({
        routeParams: {
          ...routeParams,
          startupQuestionnaireID: _.get(nextProps, 'myStartupQuestionnaire.id')
        }
      })
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

  handleSubmitFail() {
    notyError("Submission failed - please review error messages and try again")
  }


  // TODO: consider to remove
  saveOnChangeTab(tab) {
    const { order, currentTab, routeParams } = this.state

    const baseInfo = _.find(order, { key: currentTab })
    const modelKey = _.get(baseInfo, 'modelKey')

    if (modelKey) {
      const { formValues } = this.props
      const thisFormValues = _.get(formValues, modelKey)

      const thisError = _.get(thisFormValues, "syncErrors")
      const thisValues = _.get(thisFormValues, "values")

      if (!thisError) {
        this.props.uMyStartupQuestionnaire({
          [currentTab]: thisValues
        }, () => {
          this.changeTab(tab)
        }, routeParams)
      } else {
        this.handleSubmitFail()
      }
    } else {
      this.changeTab(tab)
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

  uMyStartupQuestionnaire(values) {
    const { routeParams, currentTab } = this.state
    const baseInfo = _.find(this.state.order, { key: currentTab })

    this.props.uMyStartupQuestionnaire({
      [currentTab]: values
    }, () => {
      this.changeTab(baseInfo.nextTab)
    }, routeParams)
  }

  dMSQAttributes(value, key, cb) {
    const { routeParams } = this.state
    const valueID = _.get(value, 'id', null)

    if (valueID) {
      const { myStartupQuestionnaire } = this.props
      const { order, currentTab } = this.state

      const dataKey = _.find(order, { key: currentTab }).dataKey
      const questionnairePiece = _.get(myStartupQuestionnaire, dataKey, {})

      const params = {
        [currentTab]: {
          id: _.get(questionnairePiece, 'id', null),
          [key.split("[")[0]]: [{
            id: valueID,
            _destroy: true
          }]
        }
      }

      this.props.dMyStartupQuestionnaireAttribute(params, cb, routeParams)
    } else {
      if (cb) cb()
    }
  }

  renderTab() {
    const {
      attachmentOptions, hashtagOptions, capTableOptions, myStartupQuestionnaire,
      uMyStartupQuestionnaireInProcess, dMyStartupQuestionnaireAttributeInProcess
    } = this.props
    const { currentTab, order, routeParams } = this.state

    const baseInfo = _.find(order, { key: currentTab })

    if (baseInfo.nonForm) {
      return <baseInfo.model routeParams={routeParams} />
    } else {
      const questionnairePiece = _.get(myStartupQuestionnaire, baseInfo.dataKey, {})
      const formatValues = baseInfo.formatValues
      const initialValues = formatValues ? formatValues(questionnairePiece || {}) : questionnairePiece

      return (
        <baseInfo.model
          initialValues={initialValues}
          baseInfo={baseInfo}
          onSubmit={this.uMyStartupQuestionnaire}
          onSubmitFail={this.handleSubmitFail}
          dMSQAttributes={this.dMSQAttributes}
          submitInProcess={uMyStartupQuestionnaireInProcess || dMyStartupQuestionnaireAttributeInProcess}
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
      myCampaign,
      gMyStartupQuestionnaireInProcess,
      gAttachmentOptionsInProcess, gHashtagOptionsInProcess, gCapTableOptionsInProcess,
      uMyStartupQuestionnaireInProcess
    } = this.props
    const { currentTab, order } = this.state

    if (myCampaign && !myCampaign.can.edit && currentTab !== "success") {
      return null
    }

    if (gMyStartupQuestionnaireInProcess || gAttachmentOptionsInProcess || gHashtagOptionsInProcess || gCapTableOptionsInProcess) return <LoadingSpinner />

    return (
      <div id="my-campaigns-edit" className={currentTab !== "success" && "remove-body-top-padding"}>
        {
          currentTab !== "success" && <SharedOthersTabNav disableNav={uMyStartupQuestionnaireInProcess} order={order} currentTab={currentTab} handleClick={this.changeTab} />
        }

        <SharedOthersSideTitle title="startup" optClass="hidden-xs hidden-sm col-md-offset-1 col-md-2" number="1" />

        { this.renderTab() }
      </div>
    )
  }
}
