import React, { Component } from 'react'
import SignaturePad from 'signature_pad'

export default class SignatureField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pad: null,
      isEmpty: true,
      redoPad: false,
      canvasX: 300,
      canvasY: 150,
      events: [],
      signedOn: null
    }

    this.setPad = this.setPad.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.redo = this.redo.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentDidMount() {
    this.setPad()
  }

  setPad() {
    // {
    //   signature: 'svg',
    //   investor_agreement_events: [
    //     { occurred_on: 123208039248209834, event_type: 4, addittional_details: { }}
    //   ]
    // }

    const canvas = document.querySelector("canvas")
    if (canvas) {
      const { canvasX, canvasY } = this.state

      this.setState({ isEmpty: true })
      canvas.width = this.state.canvasX
      canvas.height = this.state.canvasY

      const pad = new SignaturePad(canvas, {
        onBegin: (e) => {
          const { opts: { eventsKey, detailsKey } } = this.props
          const oldEvents = this.state.events
          const newEvent = {
            occurred_on: moment().toDate(),
            event_type: 4,
            [detailsKey]: {
              canvasX,
              canvasY,
              startX: e.layerX,
              startY: e.layerY,
              endX: null,
              endY: null,
              startTime: e.timeStamp,
              endTime: null,
              duration: null
            }
          }

          const newEvents = [...oldEvents, newEvent]

          this.setState({ events: newEvents })
          this.props.input.onFocus()
          this.props.input.onChange({
            [eventsKey]: newEvents
          })
        },
        onEnd: (e) => {
          const { opts: { fileKey, eventsKey, detailsKey } } = this.props
          if (this.state.isEmpty) {
            this.setState({ isEmpty: false })
          }
          const oldEvents = this.state.events
          const lastOldEvent = oldEvents[oldEvents.length - 1]
          lastOldEvent[detailsKey].endX = e.layerX
          lastOldEvent[detailsKey].endY = e.layerY
          lastOldEvent[detailsKey].endTime = e.timeStamp
          lastOldEvent[detailsKey].duration = e.timeStamp - lastOldEvent[detailsKey].startTime

          const newEvents = [...oldEvents]
          const signature = this.state.pad.toDataURL("image/svg+xml")

          this.setState({ events: newEvents })
          this.props.input.onChange({
            [eventsKey]: newEvents,
            [fileKey]: signature
          })
        }
      })

      this.setState({ pad })
    }

    window.addEventListener("resize", this.clearCanvas)
  }

  clearCanvas() {
    const { pad } = this.state
    if (pad) {
      pad.clear()
    }
    this.setState({ isEmpty: true })
    this.props.input.onChange(this.props.meta.initial)
  }

  redo() {
    this.setState({ redoPad: true })
    setTimeout(() => {
      this.setPad()
    }, 10)
  }

  cancel() {
    this.setState({ redoPad: false })
    this.props.input.onChange(this.props.meta.initial)
  }

  render() {
    const {
      input, meta: { touched, invalid, error },
      opts: {
        label, hint,
        optClass,
        showErrors,
        urlKey
      }
    } = this.props

    const { redoPad, canvasX, canvasY } = this.state

    const hasErrorClass = (showErrors || touched) && invalid ? 'has-error' : ''
    const fileUrl = _.get(input.value, urlKey)

    return (
      <div className={`form-group clearfix ${hasErrorClass} ${optClass} signature-field`}>
        { hint && <span className="help-block hint">{hint}</span>}

        <div className="block-wrapper">
          {
            fileUrl && !redoPad && (
              <img
                className="preview-signature margin-bottom-5"
                src={fileUrl}
                alt="signature"
                style={{ height: canvasY, width: canvasX }}
              />
            )
          }
          {
            (!fileUrl || redoPad) && (
              <canvas className="signature" />
            )
          }
          <div className="canvas-control">
            <button
              type="button"
              className="btn btn-default"
              onClick={this.clearCanvas}
            >Clear</button>
            {
              fileUrl && !redoPad && (
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.redo}
                >Redo</button>
              )
            }
            {
              redoPad && (
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.cancel}
                >Cancel Redo</button>
              )
            }
          </div>
        </div>

        { label && <label htmlFor={input.name}>{label} {hasErrorClass && <span className="help-block">{(showErrors || touched) ? error.join(", ") : ''}</span>} </label> }
        { !label && <span className="help-block">{(showErrors || touched) && hasErrorClass && error.join(", ")}&nbsp;</span>}
      </div>
    )
  }
}
