import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyStartupKPI, UPDATE_MY_STARTUP_KPI
} from '../../../../actions/my/startups/kpis'

import MyStartupKPIForm from '../../../forms/my/startups/kpi'

const mapStateToProps = (state) => {
  return {
    updateMyStartupKPIInProcess: _.get(state.requestStatus, UPDATE_MY_STARTUP_KPI)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyStartupKPI: bindActionCreators(updateMyStartupKPI, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEditKPIModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyStartupKPI = this.updateMyStartupKPI.bind(this)
  }

  updateMyStartupKPI(values) {
    this.props.updateMyStartupKPI(values, {
      ...this.props.params,
      kpiID: _.get(this.props.kpi, 'id', null)
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyStartupKPIInProcess, kpi } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit KPI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupKPIForm
            onSubmit={this.updateMyStartupKPI}
            submitInProcess={updateMyStartupKPIInProcess}
            initialValues={{
              detail: _.get(kpi, 'detail', '')
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
