import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupKPI, C_MY_STARTUP_KPI,
  uMyStartupKPI, U_MY_STARTUP_KPI
} from '../../../../actions/my/startups/kpis'

import MyStartupsKPIForm from '../../../forms/my/startups/kpi'

const mapStateToProps = (state) => {
  return {
    cMyStartupKPIInProcess: _.get(state.requestStatus, C_MY_STARTUP_KPI),
    uMyStartupKPIInProcess: _.get(state.requestStatus, U_MY_STARTUP_KPI)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupKPI: bindActionCreators(cMyStartupKPI, dispatch),
    uMyStartupKPI: bindActionCreators(uMyStartupKPI, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEKPIModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyStartupKPI(values, {
        ...this.props.params,
        kpiID: _.get(this.props.kpi, 'id', null)
      }, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartupKPI(values, this.props.params, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupKPIInProcess, uMyStartupKPIInProcess, editMode, kpi } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      detail: _.get(kpi, 'detail', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} KPI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsKPIForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyStartupKPIInProcess || uMyStartupKPIInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
