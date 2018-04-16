import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsETextModal from '../../modals/my/startups/e-text'

export default class SharedStartupsTextSection extends Component {
  constructor(props) {
    super(props)

    this.state = { eText: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ eText: true })
  }

  close() {
    this.setState({ eText: false })
  }

  render() {
    const { data, editable, routeParams } = this.props
    const { eText } = this.state

    return (
      <Element name={data.title} className="section clearfix">
        <SharedStartupsTitle
          title={data.title}
          editable={editable}
          open={() => { this.open() }}
        />

        <SharedStartupsEmpty
          title={data.title}
          condition={!data.exist}
          editable={editable}
        />
        {
          data.exist && (
            <div><p dangerouslySetInnerHTML={{ __html: data.data.decode() }} /></div>
          )
        }
        {
          eText && (
            <MyStartupsETextModal
              close={this.close}
              params={routeParams}
              data={data}
            />
          )
        }
      </Element>
    )
  }
}
