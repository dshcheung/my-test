export const apiStartupsIndex = () => {
  return 'startups'
}

export const apiStartupsShow = (params) => {
  return `${apiStartupsIndex()}/${params.startupID}`
}

export const apiUsersIndex = () => {
  return 'users'
}

export const apiAuthenticatesIndex = () => {
  return 'authentications'
}

export const apiRequestForgetPassword = () => {
  return `${apiAuthenticatesIndex()}/forgot_password`
}

export const apiMy = () => {
  return 'my'
}

export const apiMyProfile = () => {
  return `${apiMy()}/profile`
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
