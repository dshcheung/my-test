import React, { Component } from 'react'

export default class SharedOthersTabNav extends Component {
  render() {
    const { order, currentTab, handleClick, disableNav } = this.props
    return (
      <div className="tab-nav">
        <div className="container">
          {
            order.map((t, i) => {
              const bgColor = currentTab === t.key ? "active" : ""
              const disabledClass = disableNav ? "disabled" : "pointer"
              return (
                <div
                  key={i}
                  className={`pointer tab-item ${bgColor} ${disabledClass}`}
                  onClick={() => {
                    if (handleClick) handleClick(t.key)
                  }}
                >{t.title}</div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
