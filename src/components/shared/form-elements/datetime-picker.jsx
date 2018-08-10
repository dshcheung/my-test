import React, { Component } from 'react'
import DateTimePick from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'

momentLocalizer(moment)

export default class DateTimePickerField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: null,
      open: false,
      buttonClicked: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onKey = this.onKey.bind(this)
  }

  componentDidMount() {
    this.node.querySelector("input").addEventListener("click", () => {
      this.setState({ buttonClicked: false, open: "date" })
    })

    this.node.querySelectorAll("button").forEach((elem) => {
      elem.addEventListener("click", () => {
        this.setState({ buttonClicked: true, open: "date" })
      })
    })
  }

  onChange(date) {
    this.setState({ date })
    this.props.input.onChange(date)
  }

  onSelect() {
    const { open, buttonClicked } = this.state
    const { opts: { time } } = this.props

    if (open === "date" && (time === undefined || time) && !buttonClicked) {
      this.setState({ open: "time" })
    } else {
      this.setState({ open: false })
    }
  }

  onFocus() {
    setTimeout(() => {
      const { buttonClicked } = this.state
      const { opts: { date, time } } = this.props

      if (!buttonClicked) {
        if (date === undefined || date) {
          this.setState({ open: "date" })
        } else if (time === undefined || time) {
          this.setState({ open: "time" })
        }
      }
    }, 200)
  }

  onBlur(e) {
    this.setState({ open: false })
    if (this.state.date != null) {
      this.props.input.onBlur(this.state.date)
    } else {
      setTimeout(() => {
        e.target.value = ""
      }, 0)
      this.props.input.onBlur()
    }
  }

  onKey(e) {
    e.preventDefault()
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
          containerClassName={`${label && "has-label"} ${input.value && "has-value"}`}
          autofocus={false}
          placeholder={placeholder}
          date={date}
          time={time}
          format={format}
          min={min}
          max={max}
          step={step || 30}
          views={views}
          finalView="year"
          open={this.state.open}
          onToggle={() => {}}
          {...input}
          value={this.state.date || null}
          onChange={this.onChange}
          onSelect={this.onSelect}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKey}
          onKeyUp={this.onKey}
        />
        { label && <label className={input.value && 'has-value'} htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{touched && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
