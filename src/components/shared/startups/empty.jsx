import React, { Component } from 'react'

export default class SharedStartupsEmpty extends Component {
  render() {
    const { title, condition, editable } = this.props
    const keyWord = "Edit"


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
