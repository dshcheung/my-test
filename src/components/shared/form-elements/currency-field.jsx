import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import { CURRENCIES } from '../../../services/constants'

export default class CurrencyField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.input.value.id || null,
      currency: props.input.value.currency || "HKD",
      amount: props.input.value.amount
    }

    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onSelect(eventKey) {
    this.setState({ currency: eventKey })
    this.props.input.onChange({ ...this.state, currency: eventKey })
  }

  onChange(e) {
    this.setState({ amount: e.target.value })
    this.props.input.onChange({ ...this.state, amount: e.target.value })
  }

  onBlur(e) {
    this.setState({ amount: e.target.value })
    this.props.input.onBlur({ ...this.state, amount: e.target.value })
  }

  render() {
    const {
      input: { value, onChange, onBlur, ...rest },
      meta: { touched, invalid, error },
      opts: {
        label,
        placeholder,
        hint
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} currency-field`}>
        { hint && <span className="hint help-block">{hint}</span> }

        <div className="input-group">
          <div className="input-group-btn">
            <DropdownButton
              bsStyle="default"
              title={this.state.currency}
              id="currency-dropdown"
              onSelect={this.onSelect}
            >
              {
                CURRENCIES.map((o) => {
                  return <MenuItem eventKey={o.name} key={o.name}>&nbsp;{o.name}</MenuItem>
                })
              }
            </DropdownButton>
          </div>
          <input
            className="form-control"
            placeholder={placeholder}
            type="number"
            value={value.amount}
            onChange={this.onChange}
            onBlur={this.onBlur}
            {...rest}
          />
        </div>

        { label && <label htmlFor={rest.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
