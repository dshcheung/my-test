import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

export default class RichTextEditorField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.input.value ?
        RichTextEditor.createValueFromString(this.props.input.value, 'html') :
        RichTextEditor.createEmptyValue()
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
    let html = value.toString('html')
    if (html.length === 2 && html.charCodeAt(0) === 8203 && html.charCodeAt(1) === 10) {
      html = ''
    }
    this.props.input.onChange(html)
  }

  render() {
    const {
      input,
      meta: { touched, invalid, error },
      opts: {
        label,
        placeholder,
        hint
      }
    } = this.props

    const { state: { value }, handleChange } = this

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label}</label> }
        <RichTextEditor
          value={value}
          onChange={handleChange}
          placeholder={placeholder || "Start Typing Here"}
        />
        { hint && <span className="help-block">{hint}</span> }
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
      </div>
    )
  }
}
