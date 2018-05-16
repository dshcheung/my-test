import React, { Component } from 'react'

export default class InPersonValidation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showVideo: true,
      video: null,
      videoReady: false,
      errorMsg: null
    }

    this.startCamera = this.startCamera.bind(this)
    this.toggleVideo = this.toggleVideo.bind(this)
    this.takeSnapshot = this.takeSnapshot.bind(this)
  }

  componentDidMount() {
    this.startCamera()
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
          errorMsg: null
        })
      }).catch((error) => {
        this.setState({
          errorMsg: "Could not access the camera. Error: " + error.name
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
    img.src = canvas.toDataURL('image/png')
  }

  render() {
    const { showVideo, errorMsg, width } = this.state

    const style = {
      width
    }

    const a = navigator.userAgent
    const b = navigator.platform

    return (
      <div id="page-in-person-validation" className="text-center">
        { a }

        { b }
        { errorMsg && <h4 className="text-danger">{errorMsg}</h4>}

        <canvas id="canvas" style={{ display: "none" }} />

        <div className="video-group">
          <h4 className={showVideo ? "help-text" : "hide"}>Click Anywhere To Take Photo</h4>

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
            className={showVideo ? "hide" : "btn btn-warning another"}
            onClick={this.toggleVideo}
          ><i className="fa fa-redo fa-3x" /></button>

          <button
            className={showVideo ? "hide" : "btn btn-info upload"}
          ><i className="fa fa-upload fa-3x" /></button>
        </div>
      </div>
    )
  }
}
