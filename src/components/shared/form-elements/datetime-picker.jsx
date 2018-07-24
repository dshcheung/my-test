import React, { Component } from 'react'
import DateTimePick from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'

momentLocalizer(moment)

export default class DateTimePickerField extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.node) {
      this.node.querySelector('.rw-datetime-picker .rw-widget-picker input').disabled = true
    }
  }

  handleChange(date) {
    this.props.input.onChange(date)
  }

  render() {
    const {
      input, meta: { invalid, error, touched },
      opts: {
        label,
        placeholder,
        min, max, views, date, time, format, step,
        hint, optClass
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div
        className={`form-group clearfix ${hasErrorClass} ${optClass}`}
        ref={(node) => { this.node = node }}
      >
        { hint && <span className="help-block hint">{hint}</span> }
        <DateTimePick
          autofocus={false}
          containerClassName={`${label && "has-label"} ${input.value && "has-value"}`}
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
          value={input.value || null}
        />
        { label && <label className={input.value && 'has-value'} htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
