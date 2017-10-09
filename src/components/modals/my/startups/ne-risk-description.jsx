import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupRisk, CU_MY_STARTUP_RISk
} from '../../../../actions/my/startups/risk'

import MyStartupRiskDescriptionForm from '../../../forms/my/startups/risk-description'

const mapStateToProps = (state) => {
  return {
    cuMyStartupRiskInProcess: _.get(state.requestStatus, CU_MY_STARTUP_RISk)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupRisk: bindActionCreators(cuMyStartupRisk, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNERiskDescriptionModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupRisk = this.cuMyStartupRisk.bind(this)
  }

  cuMyStartupRisk(values) {
    this.props.cuMyStartupRisk(values, this.props.params, () => {
      this.props.close()
    }, this.props.editMode, "Description")
  }

  render() {
    const { close, cuMyStartupRiskInProcess, editMode, description } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      description: description || ''
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Risk Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupRiskDescriptionForm
            onSubmit={this.cuMyStartupRisk}
            submitInProcess={cuMyStartupRiskInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
