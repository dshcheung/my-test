import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupMarketScope, CU_MY_STARTUP_MARKET_SCOPE
} from '../../../../actions/my/startups/market-scopes'

import MyStartupMarketScopeDescriptionForm from '../../../forms/my/startups/market-scope-description'

const mapStateToProps = (state) => {
  return {
    cuMyStartupMarketScopeInProcess: _.get(state.requestStatus, CU_MY_STARTUP_MARKET_SCOPE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupMarketScope: bindActionCreators(cuMyStartupMarketScope, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEMarketScopeDescriptionModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupMarketScope = this.cuMyStartupMarketScope.bind(this)
  }

  cuMyStartupMarketScope(values) {
    this.props.cuMyStartupMarketScope(values, this.props.params, () => {
      this.props.close()
    }, this.props.editMode, "Description")
  }

  render() {
    const { close, cuMyStartupMarketScopeInProcess, editMode, description } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      description: description || ''
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Market Scope Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupMarketScopeDescriptionForm
            onSubmit={this.cuMyStartupMarketScope}
            submitInProcess={cuMyStartupMarketScopeInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
