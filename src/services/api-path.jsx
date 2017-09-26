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

export const apiVerifyMyProfile = () => {
  return `${apiMyProfile()}/verify`
}

export const apiRequestVerification = () => {
  return `${apiMyProfile()}/resend_verification`
}

export const apiRequestResendPassword = () => {
  return `${apiMyProfile()}/reset_password`
}
