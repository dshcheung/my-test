import React, { Component } from 'react'

export default class ImageField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      previewImgUrl: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const fileList = nextProps.input.value

    if (fileList && fileList.length > 0 && this.props.input.value !== nextProps.input.value) {
      const file = _.get(fileList, '[0]', null)

      if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.setState({ previewImgUrl: e.target.result })
        }

        reader.readAsDataURL(file)
      }
    }
  }

  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label, decodeLabel,
        imgUrl,
        optClass
      }
    } = this.props

    const hasErrorClass = touched && invalid ? 'has-error' : ''
    const newInput = _.omit(input, 'value')

    return (
      <div className={`form-group clearfix ${hasErrorClass}`}>
        {label && <label htmlFor={newInput.name + "-noInteraction"}>{label}</label>}
        { decodeLabel && <label htmlFor={newInput.name + "-noInteraction"} dangerouslySetInnerHTML={{ __html: decodeLabel.decode() }} />}
        <input
          id={newInput.name}
          className="hide"
          type="file"
          accept=".jpg,.jpeg,.png"
          {...newInput}
        />
        <label
          htmlFor={newInput.name}
          className={`${optClass} image-field-label`}
          style={{ backgroundImage: `url(${this.state.previewImgUrl || imgUrl})` }}
        >
          {
            !this.state.previewImgUrl && !imgUrl && <span>Select Image</span>
          }
          {
            hasErrorClass && <span className="help-block">{touched ? error.join(", ") : ''}</span>
          }
        </label>
      </div>
    )
  }
}
