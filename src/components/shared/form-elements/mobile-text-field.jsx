import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import { COUNTRY_CODES } from '../../../constants'

export default class MobileTextField extends Component {
  constructor(props) {
    super(props)

    const mobile = props.input.value.split('-')

    this.state = {
      code: mobile[0] || '',
      number: mobile[1] || ''
    }

    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentWillMount() {
    this.onSelect("+852")
  }

  onSelect(eventKey) {
    this.setState({ code: eventKey })
    this.props.input.onChange(`${eventKey}-${this.state.number}`)
  }

  onChange(e) {
    this.setState({ number: e.target.value })
    this.props.input.onChange(`${this.state.code}-${e.target.value}`)
  }

  onBlur(e) {
    this.setState({ number: e.target.value })
    this.props.input.onBlur(`${this.state.code}-${e.target.value}`)
  }

  render() {
    const {
      input: { value, onChange, onBlur, ...rest },
      meta: { touched, invalid, error },
      opts: {
        label, decodeLabel,
        placeholder,
        hint
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        {label && <label htmlFor={rest.name}>{label}</label> }
        { decodeLabel && <label htmlFor={rest.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}

        <div className="input-group">
          <div className="input-group-btn">
            <DropdownButton
              bsStyle="default"
              title={this.state.code}
              id="country-code-dropdown"
              onSelect={this.onSelect}
            >
              {
                COUNTRY_CODES.map((o) => {
                  return <MenuItem eventKey={o.name} key={o.name}>&nbsp;{o.name}</MenuItem>
                })
              }
            </DropdownButton>
          </div>
          <input
            className="form-control"
            placeholder={placeholder}
            type="number"
            value={value.number}
            onChange={this.onChange}
            onBlur={this.onBlur}
            {...rest}
          />
        </div>
        { hint && <span className="help-block">{hint}</span> }
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
      </div>
    )
  }
}
