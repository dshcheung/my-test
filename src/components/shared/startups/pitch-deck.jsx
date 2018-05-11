import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'
import Carousel from 'react-bootstrap/lib/Carousel'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsSPitchDeckModal from '../../modals/my/startups/s-pitch-deck'

export default class SharedStartupsPitchDeck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sPitchDeck: false,
      sliderElem: null,
      itemElems: [],
      fullscreenMode: false,
      sliderStyle: {}
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.setSliderHeight = this.setSliderHeight.bind(this)
    this.windowResize = this.windowResize.bind(this)
    this.exitFullscreen = this.exitFullscreen.bind(this)
    this.makeFullscreen = this.makeFullscreen.bind(this)
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    const elem = document.querySelector("#slider")
    const items = elem.querySelectorAll("img")

    // bind onExit Fullscreen event
    document.onwebkitfullscreenchange = this.exitFullscreen
    document.onmozfullscreenchange = this.exitFullscreen
    document.MSFullscreenChange = this.exitFullscreen
    window.onresize = this.windowResize

    // set initial Slider Height
    this.setSliderHeight(false)
    this.setState({ sliderElem: elem, itemElems: items })
  }

  setSliderHeight(fullscreenMode) {
    const elem = document.querySelector("#pitch-deck")

    const sliderStyle = {}

    if (elem) {
      if (fullscreenMode) {
        sliderStyle.height = "100vh"
        sliderStyle.width = "100vw"
      } else {
        const ratio = 5 / 9
        const width = elem.clientWidth
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

  open() {
    this.setState({ sPitchDeck: true })
  }

  close() {
    this.setState({ sPitchDeck: false })
  }

  render() {
    const { data, editable, routeParams } = this.props
    const { sPitchDeck, itemElems, sliderStyle } = this.state

    const description = _.get(data, 'data.description', null)
    const descriptionExists = !!description

    const attachments = _.get(data, 'data.attachments', [])
    const emptyAttachments = attachments.length === 0

    const isEmpty = !descriptionExists && emptyAttachments
    const editMode = !isEmpty

    return (
      <Element name={data.title} className="section pitch-deck clearfix" id="pitch-deck">
        <SharedStartupsTitle
          title={data.title}
          editable={editable}
          open={() => { this.open() }}
          editMode={editMode}
        />

        <SharedStartupsEmpty
          title={data.title}
          condition={isEmpty}
          editable={editable}
          editMode={editMode}
        />

        {
          description && (
            <div className="pitch-deck-description" dangerouslySetInnerHTML={{ __html: description.decode() }} />
          )
        }

        <div id="slider" style={sliderStyle}>
          <Carousel className="img-responsive">
            {
              !emptyAttachments && attachments.map((a, i) => {
                const elem = _.get(itemElems, `[${i}]`, null)
                const style = {}

                if (elem) {
                  const heightIsBigger = elem.naturalHeight >= elem.naturalWidth
                  style.height = heightIsBigger ? "100%" : "auto"
                  style.width = heightIsBigger ? "auto" : "100%"
                }

                return (
                  <Carousel.Item key={i}>
                    <img alt={a.title} src={a.file.original} style={style} />
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
          <button onClick={this.makeFullscreen}>Fullscreen</button>
        </div>

        {
          sPitchDeck && (
            <MyStartupsSPitchDeckModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              pitchDeck={data.data}
            />
          )
        }
      </Element>
    )
  }
}
