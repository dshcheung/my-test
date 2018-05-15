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
    this.triggerExit = this.triggerExit.bind(this)
    this.makeFullscreen = this.makeFullscreen.bind(this)
  }

  componentDidMount() {
    this.onMount()
  }

  componentWillUnmount() {
    window.removeEventListener('webkitfullscreenchange', this.triggerExit)
    window.removeEventListener('mozfullscreenchange', this.triggerExit)
    window.removeEventListener('fullscreenchange', this.triggerExit)
    window.removeEventListener('resize', this.windowResize)
  }

  onMount() {
    const parentElem = this._reactInternalInstance._renderedComponent._hostNode.parentElement
    const sliderElem = parentElem.querySelector(`#${this.props.id}`)
    const itemElems = sliderElem.querySelectorAll("img")

    // bind onExit Fullscreen event
    window.addEventListener('webkitfullscreenchange', this.triggerExit)
    window.addEventListener('mozfullscreenchange', this.triggerExit)
    window.addEventListener('fullscreenchange', this.triggerExit)
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

  triggerExit() {
    if (!document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
      this.setState({ fullscreenMode: false })
    }
  }

  exitFullsreen() {
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
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
    const { itemElems, sliderStyle, fullscreenMode } = this.state

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
        {
          fullscreenMode ? (
            <button
              className="btn btn-sm btn-info"
              onClick={this.exitFullsreen}
            ><i className="fas fa-compress" /></button>
          ) : (
            <button
              className="btn btn-sm btn-info"
              onClick={this.makeFullscreen}
            ><i className="fas fa-expand" /></button>
          )
        }
      </div>
    )
  }
}
