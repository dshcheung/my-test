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
