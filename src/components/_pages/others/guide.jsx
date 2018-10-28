import React, { Component } from 'react'

export default class Guide extends Component {
  getInfo() {
    const { routeParams: { page } } = this.props
    const pages = {
      somepage: {
        someinfo: "info"
      }
    }

    return pages[page] || null
  }

  render() {
    // Enable this
    // const pageInfo = this.getInfo()

    return (
      <div>Guide</div>
    )
  }
}
