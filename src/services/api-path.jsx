export const apiStartupsIndex = () => {
  return 'startups'
}

export const apiStartupsShow = (params) => {
  return `${apiStartupsIndex()}/${params.startupID}`
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

export const apiMyStartupsIndex = () => {
  return `${apiMy()}/startups`
}

export const apiMyStartupsShow = (params) => {
  return `${apiMyStartupsIndex()}/${params.myStartupID || params.startupID}`
}

export const apiMyStartupsProfileIndex = (params) => {
  return `${apiMyStartupsShow(params)}/profile`
}

export const apiMyStartupsProfileShow = (params) => {
  return `${apiMyStartupsProfileIndex(params)}/${params.profileID}`
}

export const apiMyStartupsPitchDecksIndex = (params) => {
  return `${apiMyStartupsShow(params)}/pitch_decks`
}

export const apiMyStartupsPitchDecksShow = (params) => {
  return `${apiMyStartupsPitchDecksIndex(params)}/${params.pitchDeckID}`
}

export const apiMyStartupsMilestonesIndex = (params) => {
  return `${apiMyStartupsShow(params)}/milestones`
}

export const apiMyStartupsMilestonesShow = (params) => {
  return `${apiMyStartupsMilestonesIndex(params)}/${params.milestoneID}`
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
  return `${apiMyStartupsHighlightsIndex(params)}/${params.kpiID}`
}

export const apiMyStartupsMediaIndex = (params) => {
  return `${apiMyStartupsShow(params)}/media`
}

export const apiMyStartupsMediaShow = (params) => {
  return `${apiMyStartupsMediaIndex(params)}/${params.mediaID}`
}

export const apiVerifyMyProfile = () => {
  return `${apiMyProfile()}/verify`
}

export const apiRequestVerification = () => {
  return `${apiMyProfile()}/resend_verification`
}

export const apiRequestResendPassword = () => {
  return `${apiMyProfile()}/reset_password`
}
