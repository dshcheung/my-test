import React, { Component } from 'react'

export default class SharedOthersIntro extends Component {
  render() {
    const { optClass, title, content, onContinue } = this.props

    return (
      <div id="shared-others-intro" className={`${optClass}`}>
        <h1 className="page-title-c fw-500 fs-28">{title}</h1>

        <div className="info-row row">
          {
            content.map((c, i) => {
              return (
                <div key={i} className="col-xs-6 info-card">
                  <div className="number">
                    <span>{i + 1}</span>
                  </div>

                  <div className="content">
                    <strong className="h4">{c.title}</strong>
                    <p className="fw-500">{c.body}</p>
                  </div>
                </div>
              )
            })
          }
        </div>

        <button
          className="btn btn-primary btn-outline pull-right"
          onClick={onContinue}
        >Continue</button>
      </div>
    )
  }
}
