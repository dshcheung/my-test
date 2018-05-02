import React, { Component } from 'react'

export default class SharedStartupsTitle extends Component {
  render() {
    const { title, editable, open } = this.props
    const iconClass = "fa-edit"

    return (
      <div className="h2">
        {title}
        {
          editable && (
            <button
              className="btn btn-info pull-right add"
              onClick={open}
            ><i className={`fa ${iconClass}`} /></button>
          )
        }
      </div>
    )
  }
}
