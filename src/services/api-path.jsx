export const apiStartupsIndex = () => {
  return 'startups'
}

export const apiStartupsShow = (params) => {
  return `${apiStartupsIndex()}/${params.startupID}`
}

export const apiCampaignsIndex = () => {
  return 'campaigns'
}

export const apiCampaignsShow = (params) => {
  return `${apiCampaignsIndex()}/${params.campaignID}`
}

export const apiCampaignsShowData = (params) => {
  return `${apiCampaignsShow(params)}/request_data_access`
}

export const apiCampaignsPledgesIndex = (params) => {
  return `${apiCampaignsShow(params)}/pledges`
}

export const apiCampaignsPledgesShow = (params) => {
  return `${apiCampaignsPledgesIndex(params)}/${params.pledgeID}`
}

export const apiUsersIndex = () => {
  return 'users'
}

export const apiUsersShow = (params) => {
  return `${apiUsersIndex()}/${params.userID}`
}

export const apiAuthenticatesIndex = () => {
  return 'authentications'
}

export const apiRequestForgetPassword = () => {
  return `${apiAuthenticatesIndex()}/forgot_password`
}

export const apiImmovablesIndex = () => {
  return 'immovables'
}

export const apiImmovablesShow = (params) => {
  return `${apiImmovablesIndex()}/${params.immovableID}`
}

export const apiMy = () => {
  return 'my'
}

export const apiMyDashboardIndex = () => {
  return `${apiMy()}/dashboard`
}

export const apiMyConversationsIndex = () => {
  return `${apiMy()}/conversations`
}

export const apiMyConversationsShow = (params) => {
  return `${apiMyConversationsIndex()}/${params.conversationID}`
}

export const apiMyMessagesIndex = () => {
  return `${apiMy()}/messages`
}

export const apiMyNotificationsIndex = () => {
  return `${apiMy()}/notifications`
}

export const apiMyNotificationsShow = (params) => {
  return `${apiMyNotificationsIndex()}/${params.notificationID}`
}

export const apiMyNotificationsShowRead = (params) => {
  return `${apiMyNotificationsShow(params)}/read`
}

export const apiMyPreferencesIndex = () => {
  return `${apiMy()}/preferences`
}

export const apiMyProfile = () => {
  return `${apiMy()}/profile`
}

export const apiMyExperienceIndex = () => {
  return `${apiMy()}/experiences`
}

export const apiMyExperienceShow = (params) => {
  return `${apiMyExperienceIndex()}/${params.myExperienceID}`
}

export const apiMyEndorsementsIndex = () => {
  return `${apiMy()}/endorsements`
}

export const apiMyEndorsementsShow = (params) => {
  return `${apiMyEndorsementsIndex()}/${params.myEndorsementID}`
}

export const apiMyEducationsIndex = () => {
  return `${apiMy()}/educations`
}

export const apiMyEducationsShow = (params) => {
  return `${apiMyEducationsIndex()}/${params.myEducationID}`
}

export const apiMyCampaignsIndex = () => {
  return `${apiMy()}/campaigns`
}

export const apiMyCampaignsShow = (params) => {
  return `${apiMyCampaignsIndex()}/${params.myCampaignID || params.campaignID}`
}

export const apiMyCampaignsShowMFR = (params) => {
  return `${apiMyCampaignsShow(params)}/mark_for_review`
}

export const apiMyStartupsIndex = () => {
  return `${apiMy()}/startups`
}

export const apiMyStartupsShow = (params) => {
  return `${apiMyStartupsIndex()}/${params.myStartupID || params.startupID}`
}

export const apiMyStartupsProfileIndex = (params) => {
  return `${apiMyStartupsShow(params)}/profile`
}

export const apiMyStartupsHighlightsIndex = (params) => {
  return `${apiMyStartupsShow(params)}/highlights`
}

export const apiMyStartupsHighlightsShow = (params) => {
  return `${apiMyStartupsHighlightsIndex(params)}/${params.highlightID}`
}

export const apiMyStartupsKPIsIndex = (params) => {
  return `${apiMyStartupsShow(params)}/key_performance_indicators`
}

export const apiMyStartupsKPIsShow = (params) => {
  return `${apiMyStartupsKPIsIndex(params)}/${params.kpiID}`
}

export const apiMyStartupsMilestonesIndex = (params) => {
  return `${apiMyStartupsShow(params)}/milestones`
}

export const apiMyStartupsMilestonesShow = (params) => {
  return `${apiMyStartupsMilestonesIndex(params)}/${params.milestoneID}`
}

export const apiMyStartupsFundsIndex = (params) => {
  return `${apiMyStartupsShow(params)}/funds`
}

export const apiMyStartupsFundsShow = (params) => {
  return `${apiMyStartupsFundsIndex(params)}/${params.fundID}`
}

export const apiMyStartupsTeamIndex = (params) => {
  return `${apiMyStartupsShow(params)}/team`
}

export const apiMyStartupsPitchDeckIndex = (params) => {
  return `${apiMyStartupsShow(params)}/pitch_deck`
}

export const apiMyStartupsMarketScopeIndex = (params) => {
  return `${apiMyStartupsShow(params)}/market_scope`
}

export const apiMyStartupsRiskIndex = (params) => {
  return `${apiMyStartupsShow(params)}/risk`
}

export const apiMyStartupsMediaIndex = (params) => {
  return `${apiMyStartupsShow(params)}/media`
}

export const apiMyStartupsMediaShow = (params) => {
  return `${apiMyStartupsMediaIndex(params)}/${params.mediaID}`
}

export const apiMyStartupsAttachmentsIndex = (params) => {
  return `${apiMyStartupsShow(params)}/attachments`
}

export const apiMyStartupsAttachmentsShow = (params) => {
  return `${apiMyStartupsAttachmentsIndex(params)}/${params.attachmentID}`
}

export const apiMyQuestionnairesIndex = () => {
  return `${apiMy()}/questionnaires`
}

export const apiMyStartupQuestionnairesIndex = () => {
  return `${apiMy()}/startup_questionnaires`
}

export const apiMyStartupQuestionnairesShow = (params) => {
  return `${apiMyStartupQuestionnairesIndex()}/${params.startupQuestionnaireID}`
}

export const apiMyVerificationsIndex = () => {
  return `${apiMy()}/verifications`
}

export const apiMyVerificationsResend = () => {
  return `${apiMyVerificationsIndex()}/resend_verification`
}

export const apiRequestResendPassword = () => {
  return `${apiMyProfile()}/reset_password`
}
