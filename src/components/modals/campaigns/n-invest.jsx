import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'

export default class NInvestModal extends Component {
  render() {
    const { close } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Body>
          <div
            className="text-center px-top-80 px-bottom-80"
            style={{ boxShadow: "5px 5px 30px #ccc" }}
          >
            <div><i className="ahub-3x ahub-hourglass text-primary" /></div>

            <div className="h2 margin-bottom-0">VERIFICATIONS</div>
            <div className="h2 margin-top-0">IN PROGRESS</div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
