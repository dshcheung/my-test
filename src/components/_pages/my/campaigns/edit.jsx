import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isPristine } from 'redux-form'

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
    formState: { form: _.get(state, 'form') },
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
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
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
        },
        {
          key: "teaser",
          title: "Teaser",
          dataKey: "startup_questionnaire_teaser",
          model: MyStartupQuestionnairesTeaserForm,
          modelKey: "MyStartupQuestionnairesTeaserForm",
          nextTab: "product",
        },
        {
          key: "product",
          title: "Product",
          dataKey: "startup_questionnaire_product",
          model: MyStartupQuestionnairesProductForm,
          modelKey: "MyStartupQuestionnairesProductForm",
          nextTab: "market",
        },
        {
          key: "market",
          title: "Market",
          dataKey: "startup_questionnaire_market",
          model: MyStartupQuestionnairesMarketForm,
          modelKey: "MyStartupQuestionnairesMarketForm",
          nextTab: "team",
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
        },
        {
          key: "campaign",
          title: "Campaign",
          dataKey: "startup_questionnaire_campaign",
          model: MyStartupQuestionnairesCampaignForm,
          modelKey: "MyStartupQuestionnairesCampaignForm",
          nextTab: "duediligence",
        },
        {
          key: "duediligence",
          title: "Due Diligence",
          dataKey: "attachments",
          model: MyStartupQuestionnairesAttachmentsForm,
          modelKey: "MyStartupQuestionnairesAttachmentsForm",
          nextTab: "submission",
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


  saveOnChangeTab(tab) {
    const { order, currentTab, routeParams } = this.state

    const baseInfo = _.find(order, { key: currentTab })
    const modelKey = _.get(baseInfo, 'modelKey')

    const { formState } = this.props
    const thisPristine = isPristine(modelKey)(formState)

    if (modelKey && !thisPristine) {
      const thisFormValues = _.get(formState.form, modelKey)
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

      return (
        <baseInfo.model
          initialValues={questionnairePiece}
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
          currentTab !== "success" && <SharedOthersTabNav disableNav={uMyStartupQuestionnaireInProcess} order={order} currentTab={currentTab} handleClick={this.saveOnChangeTab} />
        }

        <SharedOthersSideTitle title="startup" optClass="hidden-xs hidden-sm col-md-offset-1 col-md-2" number="1" />

        { this.renderTab() }
      </div>
    )
  }
}
