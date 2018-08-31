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
                <div key={i} className="col-xs-4 info-card">
                  <div className="big-number">
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

        <div className="row">
          <div className="col-xs-12 col-md-offset-8 col-md-4">
            <button
              className="btn btn-primary text-uppercase"
              onClick={onContinue}
            >Continue</button>
          </div>
        </div>
      </div>
    )
  }
}
