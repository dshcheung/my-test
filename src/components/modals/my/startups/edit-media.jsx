import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyStartupMedia, UPDATE_MY_STARTUP_MEDIA
} from '../../../../actions/my/startups/media'

import MyStartupMediaForm from '../../../forms/my/startups/media'

const mapStateToProps = (state) => {
  return {
    updateMyStartupMediaInProcess: _.get(state.requestStatus, UPDATE_MY_STARTUP_MEDIA)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyStartupMedia: bindActionCreators(updateMyStartupMedia, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEditMediaModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyStartupMedia = this.updateMyStartupMedia.bind(this)
  }

  updateMyStartupMedia(values) {
    this.props.updateMyStartupMedia(values, {
      ...this.props.params,
      mediaID: this.props.media.id
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyStartupMediaInProcess, media } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupMediaForm
            onSubmit={this.updateMyStartupMedia}
            submitInProcess={updateMyStartupMediaInProcess}
            initialValues={{
              title: _.get(media, 'title', ''),
              link: _.get(media, 'link', ''),
              description: _.get(media, 'description', '')
            }}
            bannerUrl={_.get(media, 'banner.original', '')}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
