import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

export default class TextRTE extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.input.value ?
        RichTextEditor.createValueFromString(this.props.input.value, 'html') :
        RichTextEditor.createEmptyValue(),
      format: 'html'
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
      input, meta: { touched, invalid, error },
      opts: {
        label,
        placeholder,
        hint, showErrors, validationHint
      }
    } = this.props

    const { state: { value }, handleChange } = this

    const hasErrorClass = (showErrors || touched) && invalid ? 'has-error' : ''

    return (
      <div className={`form-group flex-column clearfix ${hasErrorClass}`}>
        { label && <label htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{(showErrors || touched) ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{(showErrors || touched) && hasErrorClass && error.join(", ")}&nbsp;</span>}
        { validationHint && <span className="help-block hint">{validationHint}</span>}
        { hint && <span className="help-block hint">{hint}</span> }
        <RichTextEditor
          value={value}
          className="rte-editor"
          toolbarClassName="rte-toolbar"
          editorClassName="rte-content"
          onChange={handleChange}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          placeholder={placeholder || "Start Typing Here"}
        />
      </div>
    )
  }
}
