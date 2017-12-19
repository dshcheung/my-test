import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyCampaign, C_MY_CAMPAIGN,
  uMyCampaign, U_MY_CAMPAIGN
} from '../../../../actions/my/campaigns'

import MyStartupNameForm from '../../../forms/my/startups/name'

const mapStateToProps = (state) => {
  return {
    cMyCampaignInProcess: _.get(state.requestStatus, C_MY_CAMPAIGN),
    uMyCampaignInProcess: _.get(state.requestStatus, U_MY_CAMPAIGN)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyCampaign: bindActionCreators(cMyCampaign, dispatch),
    uMyCampaign: bindActionCreators(uMyCampaign, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsNECampaignModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyCampaign(values, this.props.params, () => {
        this.props.close()
      })
    } else {
      this.props.cMyCampaign(values, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyCampaignInProcess, uMyCampaignInProcess, editMode, name } = this.props

    const keyword = editMode ? "Edit Campaign" : "Add Campaign"
    const initialValues = editMode ? {
      name: name || ''
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupNameForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyCampaignInProcess || uMyCampaignInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
