import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  dMyStartupMedia, D_MY_STARTUP_MEDIA
} from '../../../../actions/my/startups/media'

import MyStartupsNEMediaModal from './ne-media'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupMedia: bindActionCreators(dMyStartupMedia, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsSMediaModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sMedia: true
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(modalName, stateEditMode, editInfo, editIndex) {
    this.setState({ sMedia: false, [modalName]: true, stateEditMode, editInfo, editIndex })
  }

  close(modalName) {
    this.setState({ sMedia: true, [modalName]: false, stateEditMode: false, editInfo: null, editIndex: null })
  }

  dMyStartupMedia(id) {
    this.props.dMyStartupMedia({
      ...this.props.params,
      mediaId: id
    })
  }

  render() {
    const { close, media, params, requestStatus } = this.props
    const { stateEditMode, editInfo } = this.state

    const hasMedia = !!media

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.sMedia && 'hide'}`} id="modals-my-startups-s-media" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="media">
            <div className="h3 margin-top-0">
              Attachments
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('neMedia', false) }}
              ><i className="fa fa-plus" /></button>
            </div>
            {
              hasMedia ? (
                <div className="row">
                  {
                    media.map((medium, i) => {
                      const link = _.get(medium, 'link')
                      const banner = _.get(medium, 'banner.original')

                      return (
                        <div key={i} className="col-md-2 col-sm-3 col-xs-6">
                          <a href={link} target="_blank">
                            <div
                              style={{
                                backgroundImage: `url(${banner})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                paddingTop: '100%'
                              }}
                            />
                          </a>

                          <button
                            className="btn btn-info edit pull-left"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_MEDIA}_${medium.id}`)}
                            onClick={() => { this.open("neMedia", true, medium, i) }}
                          ><i className="fa fa-pencil" /></button>

                          <button
                            className="btn btn-danger delete pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_MEDIA}_${medium.id}`)}
                            onClick={() => { this.dMyStartupMedia(medium.id) }}
                          ><i className="fa fa-trash" /></button>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div>Click Add Icon To Add Media</div>
              )
            }
          </section>
        </Modal.Body>

        {this.state.neMedia && <MyStartupsNEMediaModal close={() => { this.close("neMedia") }} params={params} editMode={stateEditMode} medium={editInfo} />}
      </Modal>
    )
  }
}

