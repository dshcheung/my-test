import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'

export default class NAuthInvestorSignupPreparing extends Component {
  render() {
    const { close } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Body>
          <div
            className="text-center px-top-80 px-bottom-80"
          >
            <div><i className="ahub-3x ahub-hourglass text-primary" /></div>

            <div
              className="margin-top-30"
              style={{ width: "350px", margin: "0 auto" }}
            ><b>AngelHub has not officially launched yet</b> and is stil in beta and for demo purposes. We are not onboarding any Professional Investors as of today.</div>

            <div className="h4 margin-top-30 text-primary">Stay put for the official launch coming soon!</div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
