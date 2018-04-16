import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsSMediaModal from '../../modals/my/startups/s-media'

export default class SharedStartupsMedia extends Component {
  constructor(props) {
    super(props)

    this.state = { sMedia: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ sMedia: true })
  }

  close() {
    this.setState({ sMedia: false })
  }

  render() {
    const { data, editable, routeParams } = this.props
    const { sMedia } = this.state
    const emptyMedia = data.data && data.data.length === 0

    return (
      <Element name={data.title} className="section clearfix">
        <SharedStartupsTitle
          title={data.title}
          editable={editable}
          open={() => { this.open() }}
        />

        <SharedStartupsEmpty
          title={data.title}
          condition={emptyMedia}
          editable={editable}
        />

        {
          !emptyMedia && (
            <div className="row">
              {
                data.data.map((post, i) => {
                  const link = _.get(post, 'link')
                  const banner = _.get(post, 'banner.original')

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
                    </div>
                  )
                })
              }
            </div>
          )
        }

        {
          sMedia && (
            <MyStartupsSMediaModal
              close={this.close}
              params={routeParams}
              media={data.data}
            />
          )
        }
      </Element>
    )
  }
}
