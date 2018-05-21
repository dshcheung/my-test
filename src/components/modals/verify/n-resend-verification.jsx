import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  resendVerification, RESEND_VERIFICATION
} from '../../../actions/my/verifications'

import VerifyEmailForm from '../../forms/verify/email'
import VerifyMobileForm from '../../forms/verify/mobile'

const mapStateToProps = (state) => {
  return {
    resendVerificationInProcess: _.get(state.requestStatus, RESEND_VERIFICATION)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resendVerification: bindActionCreators(resendVerification, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class NResetVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      verificationFor: null
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.resendVerification({
      resend_type: this.state.verificationFor,
      resend_for: _.get(values, 'email') || _.get(values, 'mobile')
    }, () => {
      this.props.close()
    })
  }

  selectVerificationFor(verificationFor) {
    this.setState({ verificationFor })
  }

  render() {
    const { close, resendVerificationInProcess } = this.props
    const { verificationFor } = this.state

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Resend Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !verificationFor && (
              <div className="row">
                <div className="col-xs-6">
                  <a
                    className="btn btn-default btn-block"
                    onClick={() => { this.selectVerificationFor("email") }}
                  >Email</a>
                </div>
                <div className="col-xs-6">
                  <a
                    className="btn btn-default btn-block"
                    onClick={() => { this.selectVerificationFor("mobile") }}
                  >Mobile</a>
                </div>
              </div>
            )
          }

          {
            verificationFor === "email" && (
              <VerifyEmailForm
                optClass=""
                onSubmit={this.onSubmit}
                submitInProcess={resendVerificationInProcess}
              />
            )
          }

          {
            verificationFor === "mobile" && (
              <VerifyMobileForm
                optClass=""
                onSubmit={this.onSubmit}
                submitInProcess={resendVerificationInProcess}
              />
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}
