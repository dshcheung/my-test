import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyStartupFund, UPDATE_MY_STARTUP_FUND
} from '../../../../actions/my/startups/funds'

import MyStartupFundForm from '../../../forms/my/startups/fund'

const mapStateToProps = (state) => {
  return {
    updateMyStartupFundInProcess: _.get(state.requestStatus, UPDATE_MY_STARTUP_FUND)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyStartupFund: bindActionCreators(updateMyStartupFund, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEditFundModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyStartupFund = this.updateMyStartupFund.bind(this)
  }

  updateMyStartupFund(values) {
    this.props.updateMyStartupFund(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyStartupFundInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Fund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupFundForm
            onSubmit={this.updateMyStartupFund}
            submitInProcess={updateMyStartupFundInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
