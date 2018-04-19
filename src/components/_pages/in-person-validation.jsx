import React, { Component } from 'react'

export default class InPersonValidation extends Component {
  componentWillMount() {
  }

  componentDidMount() {
    const video = document.querySelector('video')

    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.src = window.URL.createObjectURL(stream)
        video.addEventListener('click', () => {
          this.takeSnapshot(video)
        })
      }).catch((error) => {
        document.body.textContent = 'Could not access the camera. Error: ' + error.name
      })
    }
  }

  takeSnapshot(video) {
    const width = video.offsetWidth
    const height = video.offsetHeight

    const canvas = document.querySelector('canvas')
    canvas.width = width
    canvas.height = height

    let context = null
    context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, width, height)

    const img = document.querySelector('img')
    img.src = canvas.toDataURL('image/png')
    document.body.appendChild(img)
  }

  render() {
    return (
      <div>
        <video id="video" autoPlay>No video found</video>
        <canvas id="canvas" />
        <img id="photo" alt="The screen capture will appear in this box." />
      </div>
    )
  }
}
