import React, { Component } from 'react'

export default class SharedOthersSideTitle extends Component {
  render() {
    const { title, optClass, number } = this.props

    return (
      <div id="shared-others-side-title" className={optClass}>
        <div className="clearfix">
          {
            number && <span className="number">{number}</span>
          }

          {
            number && <br />
          }

          <span className="title">{ title }</span>
        </div>
      </div>
    )
  }
}
