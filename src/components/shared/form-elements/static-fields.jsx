import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class StaticFields extends Component {
  render() {
    const {
      names,
      opts: {
        label, hint, fields
      }
    } = this.props

    console.log(this.props)

    // const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className="static-fields">
        {
          names.map((n) => {

          })
        }
      </div>
    )
  }
}

// <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
//   { customLabel && label && customLabel(label, input.name) }
//   { !customLabel && label && <label htmlFor={input.name}>{label}</label> }
//   { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
//   { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
//   { hint && <span className="help-block">{hint}</span> }
//   {
//     inputGroup ? (
//       <div className="input-group">
//         <input
//           className="form-control"
//           placeholder={placeholder}
//           type={type || "text"}
//           step={step}
//           min={min}
//           {...input}
//         />
//         {
//           backInputGroup && <span className="input-group-addon">{backInputGroup}</span>
//         }
//       </div>
//     ) : (
//       <input
//         className="form-control"
//         placeholder={placeholder}
//         type={type || "text"}
//         step={step}
//         min={min}
//         {...input}
//       />
//     )
//   }
// </div>
