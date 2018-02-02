import React, { Component } from 'react'

export default class SharedStartupsTitle extends Component {
  render() {
    const { title, editable, open, editMode } = this.props
    const iconClass = editMode ? "fa-pencil" : "fa-plus"

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
