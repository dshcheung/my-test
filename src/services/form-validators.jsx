import { isEmpty } from '../services/utils'

const validators = {
  presences: (value) => {
    if (!value) return "Required"
  },
  attrPresences: (value, { key }) => {
    if (!_.get(value, key)) return "Required"
  },
  email: (value) => {
    const reg = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
    if (!reg.test(value)) return "Email is Invalid"
  },
  length: (value, { min, max }) => {
    const length = value ? value.length : 0
    if (min && length < min) return `Minimum ${min} Characters`
    if (max && length > max) return `Maximum ${max} Characters`
  },
  confirmPassword: (value, { password }) => {
    if (value !== password) return "Please Enter The Same Password"
  },
  investorStatus: (value) => {
    if (value === "5") return 'AngelHub is accredited investors only at this time.'
  },
  numericality: (value, { min, max }) => {
    if (min && value < min) return `Minimum ${min}`
    if (max && value > max) return `Maximum ${max}`
  },
  complexArrOfObj: (valueArr, { selfPresences, childFields }) => {
    if (selfPresences) {
      const selfError = {}

      if (!valueArr || valueArr.length === 0) {
        selfError._error = "Need at least 1"
      }

      if (!isEmpty(selfError)) {
        return selfError
      }
    }

    const childErrors = []

    // field = "detail"
    _.forOwn(childFields, (toValidates, field) => {
      _.forEach(valueArr, (vObj, i) => {
        const targetV = _.get(vObj, field)
        const e = []

        _.forEach(toValidates, (toValidate) => {
          const msg = validators[toValidate.type || toValidate](targetV, toValidate.opts)
          if (msg) {
            e.push(msg)
          }
        })

        if (e.length > 0) {
          if (!childErrors[i]) {
            childErrors[i] = {}
          }

          _.set(childErrors, `[${i}].${field}`, e)
        }
      })
    })

    if (childErrors.length > 0) {
      return childErrors
    }
  }
}

export default function Validators(fields, values, complexFields) {
  const errorsObj = {}

  _.forOwn(fields, (toValidates, field) => {
    const value = _.get(values, field, null)

    const isComplex = _.indexOf(complexFields, field) >= 0
    let error = []

    _.forEach(toValidates, (toValidate) => {
      const msg = validators[toValidate.type || toValidate](value, toValidate.opts, field)
      if (msg) {
        if (isComplex) {
          error = msg
        } else {
          error.push(msg)
        }
      }
    })

    if (error.length > 0 || !isEmpty(error)) {
      errorsObj[field] = error
    }
  })

  return errorsObj
}
