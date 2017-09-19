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

export const notySuccess = (text) => {
  const newConfig = {
    ...defaults,
    text,
    type: 'success'
  }

  new Noty(newConfig).show()
}
