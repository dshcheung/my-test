import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupMedia, C_MY_STARTUP_MEDIA,
  uMyStartupMedia, U_MY_STARTUP_MEDIA
} from '../../../../actions/my/startups/media'

import MyStartupsMediaForm from '../../../forms/my/startups/media'

const mapStateToProps = (state) => {
  return {
    cMyStartupMediaInProcess: _.get(state.requestStatus, C_MY_STARTUP_MEDIA),
    uMyStartupMediaInProcess: _.get(state.requestStatus, U_MY_STARTUP_MEDIA)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupMedia: bindActionCreators(cMyStartupMedia, dispatch),
    uMyStartupMedia: bindActionCreators(uMyStartupMedia, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEMediaModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyStartupMedia(values, {
        ...this.props.params,
        mediaID: this.props.medium.id
      }, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartupMedia(values, this.props.params, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupMediaInProcess, uMyStartupMediaInProcess, editMode, medium } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      title: _.get(medium, 'title', ''),
      description: _.get(medium, 'description', ''),
      link: _.get(medium, 'link', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsMediaForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyStartupMediaInProcess || uMyStartupMediaInProcess}
            initialValues={initialValues}
            bannerUrl={_.get(medium, 'banner.original', '')}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
