import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartupFund, CREATE_MY_STARTUP_FUND
} from '../../../../actions/my/startups/funds'

import MyStartupFundForm from '../../../forms/my/startups/fund'

const mapStateToProps = (state) => {
  return {
    createMyStartupFundInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP_FUND)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartupFund: bindActionCreators(createMyStartupFund, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddFundModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartupFund = this.createMyStartupFund.bind(this)
  }

  createMyStartupFund(values) {
    this.props.createMyStartupFund(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupFundInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Fund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupFundForm
            onSubmit={this.createMyStartupFund}
            submitInProcess={createMyStartupFundInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
