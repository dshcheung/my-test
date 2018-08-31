import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'

export default class NInvestModal extends Component {
  render() {
    const { close } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title>Invest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div><i className="ahub-3x ahub-lock text-dark" /></div>

            <div className="h4">Warning</div>

            <p>Verification In Progress</p>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
