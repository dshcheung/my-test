import Noty from 'noty'

export const defaults = {
  layout: 'topCenter',
  theme: 'mint',
  timeout: 5000
}

export const notyError = (text) => {
  const newConfig = {
    ...defaults,
    text,
    type: 'error'
  }

  new Noty(newConfig).show()
}

export const notyWarning = (text) => {
  const newConfig = {
    ...defaults,
    text,
    type: 'warning'
  }

  new Noty(newConfig).show()
}

export const notySuccess = (text) => {
  const newConfig = {
    ...defaults,
    text,
    type: 'success'
  }

  new Noty(newConfig).show()
}

export const handleFormErrors = (data) => {
  const errorMessages = _.get(data, 'data.meta.message')
  let notyMessage = ""

  if (Array.isArray(errorMessages)) {
    errorMessages.forEach((message) => {
      notyMessage += `<div>${message}</div>`
    })
  } else {
    notyMessage = errorMessages
  }

  notyError(notyMessage)
}
