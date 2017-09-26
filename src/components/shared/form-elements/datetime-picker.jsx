import React, { Component } from 'react'
import DateTimePick from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'

momentLocalizer(moment)

export default class DateTimePickerField extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date) {
    this.props.input.onChange(date)
  }

  render() {
    const { input, meta: { invalid, error, touched }, opts: {
      label, placeholder, noHelp, min, max, views, date, time, format, step
    } } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        <DateTimePick
          {...input}
          onChange={this.handleChange}
          onBlur={() => {}}
          placeholder={placeholder}
          date={date}
          time={time}
          format={format}
          min={min}
          max={max}
          views={views}
          step={step || 30}
          finalView="year"
        />
        {
          hasErrorClass && !noHelp && <span className="help-block">{touched ? error.join(", ") : ''}</span>
        }
      </div>
    )
  }
}
