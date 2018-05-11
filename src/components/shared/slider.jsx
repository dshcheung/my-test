import React, { Component } from 'react'
import Carousel from 'react-bootstrap/lib/Carousel'

export default class SharedSlider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderElem: null,
      itemElems: [],
      fullscreenMode: false,
      sliderStyle: {}
    }

    this.setSliderHeight = this.setSliderHeight.bind(this)
    this.windowResize = this.windowResize.bind(this)
    this.exitFullscreen = this.exitFullscreen.bind(this)
    this.makeFullscreen = this.makeFullscreen.bind(this)
  }

  componentDidMount() {
    this.onMount()
  }

  componentWillUnmount() {
    window.removeEventListener('webkitfullscreenchange', this.exitFullscreen)
    window.removeEventListener('mozfullscreenchange', this.exitFullscreen)
    window.removeEventListener('fullscreenchange', this.exitFullscreen)
    window.removeEventListener('resize', this.windowResize)
  }

  onMount() {
    const parentElem = this._reactInternalInstance._renderedComponent._hostNode.parentElement
    const sliderElem = parentElem.querySelector('.carousel')
    const itemElems = sliderElem.querySelectorAll("img")

    // bind onExit Fullscreen event
    window.addEventListener('webkitfullscreenchange', this.exitFullscreen)
    window.addEventListener('mozfullscreenchange', this.exitFullscreen)
    window.addEventListener('fullscreenchange', this.exitFullscreen)
    window.addEventListener('resize', this.windowResize)
    // set initial Slider Height
    this.setSliderHeight(false)
    this.setState({ sliderElem, itemElems })
  }

  setSliderHeight(fullscreenMode) {
    const parentElem = this._reactInternalInstance._renderedComponent._hostNode.parentElement
    const sliderStyle = {}

    if (parentElem) {
      if (fullscreenMode) {
        sliderStyle.height = "100vh"
        sliderStyle.width = "100vw"
      } else {
        const ratio = 5 / 9
        const width = parentElem.clientWidth
        const height = width * ratio

        sliderStyle.height = `${height}px`
      }
    }

    this.setState({ sliderStyle })
  }

  windowResize() {
    this.setSliderHeight(this.state.fullscreenMode)
  }

  exitFullscreen() {
    if (!document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
      this.setState({ fullscreenMode: false })
    }
  }

  makeFullscreen() {
    const { sliderElem } = this.state

    if (sliderElem.webkitRequestFullscreen) {
      sliderElem.webkitRequestFullScreen()
    } else if (sliderElem.mozRequestFullScreen) {
      sliderElem.mozRequestFullScreen()
    } else if (sliderElem.msRequestFullscreen) {
      sliderElem.mozRequestFullScreen()
    }

    this.setState({ fullscreenMode: true })
  }

  render() {
    const { id, srcKey, titleKey, data } = this.props
    const { itemElems, sliderStyle } = this.state

    const emptyData = data.length === 0

    return (
      <div id={id} className="shared-slider" style={sliderStyle}>
        <Carousel className="img-responsive">
          {
            !emptyData && data.map((d, i) => {
              const elem = _.get(itemElems, `[${i}]`, null)
              const style = {}

              if (elem) {
                const heightIsBigger = elem.naturalHeight >= elem.naturalWidth
                style.height = heightIsBigger ? "100%" : "auto"
                style.width = heightIsBigger ? "auto" : "100%"
              }

              const src = _.get(d, srcKey, '')
              const title = _.get(d, titleKey, '')

              return (
                <Carousel.Item key={i}>
                  <img alt={title} src={src} style={style} />
                </Carousel.Item>
              )
            })
          }
        </Carousel>
        <button onClick={this.makeFullscreen}>Fullscreen</button>
      </div>
    )
  }
}
