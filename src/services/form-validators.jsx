import { isEmpty, getType } from '../services/utils'

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
  lengthWord: (value, { min, max }) => {
    if (value) {
      const newValue = value.replace(/(\r\n|\n|\r)/gm, " ").replace(/<[^>]*>/, " ").replace(/\s+/, ' ').trim()

      const length = newValue ? newValue.split(" ").length : 0
      if (min && length < min) return `Minimum ${min} Words`
      if (max && length > max) return `Maximum ${max} Words`
    }
  },
  amount: (value, { min, max }) => {
    if (value) {
      const amount = value.length
      if (min && amount < min) return `Minimum of ${min}`
      if (max && amount > max) return `Maximum of ${max}`
    }
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
  complexArrOfObj: (valueArr, { selfPresences, selfMin, selfMax, childFields, uniqFields }) => {
    const selfError = {}
    if (selfPresences) {
      if (!valueArr || valueArr.length === 0) {
        selfError._error = "Need at least 1"
      }
    }

    if (selfMin) {
      if (valueArr && valueArr.length < selfMin) {
        selfError._error = `Too Little, Minimum is ${selfMin}`
      }
    }

    if (selfMax) {
      if (valueArr && valueArr.length > selfMax) {
        selfError._error = `Too Many, Maximum is ${selfMax}`
      }
    }

    if (!isEmpty(selfError)) {
      return selfError
    }

    const childErrors = []

    if (uniqFields) {
      _.forEach(uniqFields, (fieldToBeUniq) => {
        const duplicateIndexes = []

        _.forEach(valueArr, (vObj, i) => {
          const targetV = _.get(vObj, fieldToBeUniq)

          const firstIndex = _.findIndex(valueArr, (v) => {
            return v[fieldToBeUniq] === targetV
          })
          const lastIndex = _.findLastIndex(valueArr, (v) => {
            return v[fieldToBeUniq] === targetV
          })

          if (firstIndex !== lastIndex) {
            duplicateIndexes.push(i)
          }
        })

        _.forEach(duplicateIndexes, (di) => {
          _.set(childErrors, `[${di}].${fieldToBeUniq}`, ["Must Be Uniq"])
        })
      })
    }

    if (childFields) {
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
    }

    if (childErrors.length > 0) {
      return childErrors
    }
  },
  questionnaire: (values, { answersKey, answerKey, validationsKey }) => {
    const answers = _.get(values, answersKey, [])
    const answersErrors = []

    answers.forEach((a) => {
      const answerErrors = []
      const answerValue = _.get(a, answerKey, null)
      const validations = _.get(a, validationsKey, {})


      _.forEach(validations, (v, k) => {
        if (v && k === "required") {
          const msg = validators.presences(answerValue)
          if (msg) {
            answerErrors.push(msg)
          }
        }
      })

      if (answerErrors.length > 0) {
        answersErrors.push({ [answerKey]: answerErrors })
      }
    })

    if (answersErrors.length > 0) {
      return {
        [answersKey]: answersErrors
      }
    }
  },
  filePresences: (value) => {
    const valueType = getType(value)
    const previewUrl = _.get(value, 'original', null)

    if (!previewUrl && valueType !== "FileList" && valueType !== "File") return "Required"
  },
  noDecimal: (value) => {
    if (value) {
      const regex = /\./
      const result = regex.test(value.toString())
      if (result) {
        return "No Decimal Permitted"
      }
    }
  },
  percentage: (value) => {
    if (value > 100) {
      return "Max 100%"
    }

    if (value < 0.1) {
      return "Min 0.1%"
    }
  },
  httpLink: (value) => {
    const regex = /^https?:\/\//
    const result = regex.test(value)
    if (!result) {
      return "Please Include http:// or https:// in front of the link"
    }
  },
  currencyPresences: (value) => {
    if (value) {
      const { currency, amount } = value

      if (!currency) return "Require Currency"
      if (!amount) return "Require Amount"
    } else {
      return "Required"
    }
  },
  mobile: (value) => {
    if (value) {
      const m = value.split("-")
      const code = m[0] || ''
      const number = m[1] || ''

      if (!code) return "Require Area Code"
      if (!number) return "Require Number"

      const regex = /^[0-9]*$/
      const result = regex.test(number)

      if (!result) return "Not A Valid Number"
    } else {
      return "Required"
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
      _.set(errorsObj, field, error)
      errorsObj._error = "Has Errors"
    }
  })

  return errorsObj
}
