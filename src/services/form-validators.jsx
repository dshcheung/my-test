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
  }
}

export default function Validators(fields, values) {
  const errorsObj = {}

  _.forOwn(fields, (toValidates, field) => {
    const value = _.get(values, field, null)
    const errorsArr = []

    _.forEach(toValidates, (toValidate) => {
      const msg = validators[toValidate.type || toValidate](value, toValidate.opts)
      if (msg) errorsArr.push(msg)
    })

    if (errorsArr.length > 0) {
      errorsObj[field] = errorsArr
    }
  })


  return errorsObj
}
