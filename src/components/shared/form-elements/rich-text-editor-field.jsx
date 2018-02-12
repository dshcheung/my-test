import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

export default class RichTextEditorField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.input.value ?
        RichTextEditor.createValueFromString(this.props.input.value, 'markdown') :
        RichTextEditor.createEmptyValue()
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
    let markdown = value.toString('markdown')
    if (markdown.length === 2 && markdown.charCodeAt(0) === 8203 && markdown.charCodeAt(1) === 10) {
      markdown = ''
    }
    this.props.input.onChange(markdown)
  }

  render() {
    const {
      meta: { touched, invalid, error },
      opts: {
        placeholder,
        hint
      }
    } = this.props

    const { state: { value }, handleChange } = this

    const hasErrorClass = touched && invalid ? 'has-error' : ''

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        <RichTextEditor
          value={value}
          onChange={handleChange}
          placeholder={"Start Typing Here" || placeholder}
        />
        { hint && <span className="help-block">{hint}</span> }
        { hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span> }
      </div>
    )
  }
}
