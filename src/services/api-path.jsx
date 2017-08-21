export const apiStartupsIndex = () => {
  return 'startups'
}

export const apiStartupsShow = (params) => {
  return `${apiStartupsIndex()}/${params.startupID}`
}
