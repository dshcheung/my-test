import React, { Component } from 'react'

export default class SharedStartupsEmpty extends Component {
  render() {
    const { title, condition, editable, editMode } = this.props
    const keyWord = editMode ? "Edit" : "Add"


    if (editable && condition) {
      return (
        <div>
          <p>{`Click ${keyWord} Icon To ${keyWord} ${title}`}</p>
        </div>
      )
    }

    return null
  }
}
