import { getType } from './utils'

export const getFormData = (values, name) => {
  const formData = new FormData()

  appendFormValue(formData, `${name}`, values)

  return formData
}

export const appendFormValue = (formData, base, v) => {
  const type = getType(v)
  switch (type) {
    case 'Null':
      return true
    case 'Undefined':
      return true
    case 'Array':
      v.forEach((v2, i) => {
        appendFormValue(formData, `${base}[${i}]`, v2)
      })
      return true
    case 'Object':
      _.forOwn(v, (v2, k2) => {
        appendFormValue(formData, `${base}[${k2}]`, v2)
      })
      return true
    default:
      formData.append(base, v)
      return true
  }
}
