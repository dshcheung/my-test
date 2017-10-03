import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartupKPI, CREATE_MY_STARTUP_KPI
} from '../../../../actions/my/startups/kpis'

import MyStartupKPIForm from '../../../forms/my/startups/kpi'

const mapStateToProps = (state) => {
  return {
    createMyStartupKPIInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP_KPI)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartupKPI: bindActionCreators(createMyStartupKPI, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddKPIModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartupKPI = this.createMyStartupKPI.bind(this)
  }

  createMyStartupKPI(values) {
    this.props.createMyStartupKPI(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupKPIInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add KPI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupKPIForm
            onSubmit={this.createMyStartupKPI}
            submitInProcess={createMyStartupKPIInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
