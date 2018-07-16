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
    const {
      input, meta: { invalid, error, touched },
      opts: {
        label, decodeLabel,
        placeholder,
        min, max, views, date, time, format, step,
        hint, optClass
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        { decodeLabel && <label htmlFor={input.name} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
        { hint && <span className="help-block">{hint}</span> }
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
      </div>
    )
  }
}
