import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import SharedSlider from '../slider'
import MyStartupsSPitchDeckModal from '../../modals/my/startups/s-pitch-deck'

export default class SharedStartupsPitchDeck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sPitchDeck: false
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ sPitchDeck: true })
  }

  close() {
    this.setState({ sPitchDeck: false })
  }

  render() {
    const { data, editable, routeParams } = this.props
    const { sPitchDeck } = this.state

    const description = _.get(data, 'data.description', null)
    const descriptionExists = !!description

    const attachments = _.get(data, 'data.attachments', [])
    const emptyAttachments = attachments.length === 0

    const isEmpty = !descriptionExists && emptyAttachments
    const editMode = !isEmpty

    return (
      <Element name={data.title} className="section pitch-deck clearfix">
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

        {
          !emptyAttachments && (
            <SharedSlider
              id="pitch-deck-slider"
              data={attachments}
              srcKey="file.original"
              titleKey="title"
            />
          )
        }


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

// <div id="slider" style={sliderStyle} className="shared-slider">
//   <Carousel className="img-responsive">
//     {
//       !emptyAttachments && attachments.map((a, i) => {
//         const elem = _.get(itemElems, `[${i}]`, null)
//         const style = {}

//         if (elem) {
//           const heightIsBigger = elem.naturalHeight >= elem.naturalWidth
//           style.height = heightIsBigger ? "100%" : "auto"
//           style.width = heightIsBigger ? "auto" : "100%"
//         }

//         return (
//           <Carousel.Item key={i}>
//             <img alt={a.title} src={a.file.original} style={style} />
//           </Carousel.Item>
//         )
//       })
//     }
//   </Carousel>
//   <button onClick={this.makeFullscreen}>Fullscreen</button>
// </div>
