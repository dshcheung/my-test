import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyVerifications, U_MY_VERIFICATIONS
} from '../../../actions/my/verifications'

const mapStateToProps = (state) => {
  return {
    uMyVerificationsInProcess: _.get(state.requestStatus, U_MY_VERIFICATIONS)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyVerifications: bindActionCreators(uMyVerifications, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class InPersonValidation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showVideo: true,
      video: null,
      videoReady: false,
      errorMsg: null,
      base64: null,
      stream: null
    }

    this.startCamera = this.startCamera.bind(this)
    this.toggleVideo = this.toggleVideo.bind(this)
    this.takeSnapshot = this.takeSnapshot.bind(this)
    this.uMyVerifications = this.uMyVerifications.bind(this)
  }

  componentDidMount() {
    this.startCamera()
  }

  componentWillUnmount() {
    this.state.stream.getTracks()[0].stop()
  }

  toggleVideo() {
    this.setState({ showVideo: !this.state.showVideo })
  }

  startCamera() {
    const video = document.querySelector('#video')

    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.src = window.URL.createObjectURL(stream)
        if (!this.state.videoReady) {
          video.addEventListener('click', () => {
            this.takeSnapshot(video)
            this.toggleVideo()
          })
        }
        this.setState({
          showVideo: true,
          video,
          videoReady: true,
          errorMsg: null,
          stream
        })
      }).catch(() => {
        this.setState({
          errorMsg: "Could not access Camera. Please allow browser to access your Camera"
        })
      })
    } else {
      this.setState({
        errorMsg: "No Camera Found, Please Use A Device That Has A Camera!"
      })
    }
  }

  takeSnapshot(video) {
    const width = video.offsetWidth
    const height = video.offsetHeight

    this.setState({ width })

    const canvas = document.querySelector('#canvas')
    canvas.width = width
    canvas.height = height

    let context = null
    context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, width, height)

    const img = document.querySelector('#photo')
    const base64 = canvas.toDataURL('image/png')
    img.src = base64
    this.setState({ base64 })
  }

  uMyVerifications() {
    this.props.uMyVerifications({
      photo: this.state.base64,
      code: _.get(this.props.location, 'query.code', null)
    }, true)
  }

  render() {
    const { uMyVerificationsInProcess } = this.props
    const { showVideo, errorMsg, width } = this.state

    const style = {
      width
    }

    const isHTTPS = window.location.protocol === "https:" || window.location.hostname === "localhost"
    // const isMobile = false

    window.stream = this.state.stream

    return (
      <div id="page-in-person-validation" className="text-center">
        { !isHTTPS && <h4 className="text-danger">For security reasons, please use https://</h4>}
        { errorMsg && <h4 className="text-danger">{errorMsg}</h4>}

        <canvas id="canvas" style={{ display: "none" }} />

        <div className="video-group">
          <h3 className={showVideo ? "help-text" : "hide"}>Click Anywhere To Take Photo</h3>

          <video
            id="video"
            className={showVideo ? "" : "hide"}
            autoPlay
          >No video found</video>
        </div>

        <div className="img-group" style={style}>
          <img
            id="photo"
            className={showVideo ? "hide" : ""}
            alt="The screen capture will appear in this box."
          />

          <button
            className={showVideo ? "hide" : `btn btn-warning another ${uMyVerificationsInProcess && "m-progress"}`}
            onClick={this.toggleVideo}
            disabled={uMyVerificationsInProcess}
          ><i className="fa fa-redo fa-3x" /></button>

          <button
            className={showVideo ? "hide" : `btn btn-info upload ${uMyVerificationsInProcess && "m-progress"}`}
            onClick={this.uMyVerifications}
            disabled={uMyVerificationsInProcess}
          ><i className="fa fa-upload fa-3x" /></button>
        </div>
      </div>
    )
  }
}
