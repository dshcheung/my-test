import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupFund, C_MY_STARTUP_FUND,
  uMyStartupFund, U_MY_STARTUP_FUND
} from '../../../../actions/my/startups/funds'

import MyStartupsFundForm from '../../../forms/my/startups/fund'

const mapStateToProps = (state) => {
  return {
    cMyStartupFundInProcess: _.get(state.requestStatus, C_MY_STARTUP_FUND),
    uMyStartupFundInProcess: _.get(state.requestStatus, U_MY_STARTUP_FUND)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupFund: bindActionCreators(cMyStartupFund, dispatch),
    uMyStartupFund: bindActionCreators(uMyStartupFund, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEFundModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyStartupFund(values, {
        ...this.props.params,
        fundID: this.props.fund.id
      }, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartupFund(values, this.props.params, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupFundInProcess, uMyStartupFundInProcess, editMode, fund } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      receivedAt: moment(_.get(fund, 'received_at', moment().startOf('day'))).toDate(),
      company: _.get(fund, 'company', ''),
      amount: _.get(fund, 'amount', 0)
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Use Of Fund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsFundForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyStartupFundInProcess || uMyStartupFundInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
