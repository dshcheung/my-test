import React, { Component } from 'react'

export default class SharedOthersTabNav extends Component {
  render() {
    const { order, currentTab, handleClick, disableNav } = this.props
    return (
      <div className="tab-nav">
        <div className="container">
          {
            order.map((t, i) => {
              const title = t.title
              if (title) {
                const bgColor = currentTab === t.key ? "active" : ""
                const disabledClass = disableNav ? "disabled" : "pointer"
                const highlightError = t.requiredFields && Object.keys(t.requiredFields).length > 0 ? "error" : ""
                return (
                  <div
                    key={i}
                    className={`pointer tab-item ${bgColor} ${disabledClass} ${highlightError}`}
                    onClick={() => {
                      if (handleClick && !disableNav) handleClick(t.key)
                    }}
                  >{t.title}{highlightError && <i className="fas fa-times fa-fw" />}</div>
                )
              } else {
                return null
              }
            })
          }
        </div>
      </div>
    )
  }
}
