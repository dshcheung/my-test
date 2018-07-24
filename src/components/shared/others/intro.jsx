import React, { Component } from 'react'

export default class SharedOthersIntro extends Component {
  render() {
    const { optClass, title, content, onContinue } = this.props

    return (
      <div className={`intro ${optClass}`}>
        <h1 className="page-title-c">{title}</h1>

        <div className="info-row row">
          {
            content.map((c, i) => {
              return (
                <div key={i} className="col-xs-4 info-card">
                  <div className="number">
                    <span>{i + 1}</span>
                  </div>

                  <div className="content">
                    <b>{c.title}</b>

                    <p>{c.body}</p>
                  </div>
                </div>
              )
            })
          }
        </div>

        <button
          className="btn btn-danger pull-right"
          onClick={onContinue}
        >Continue</button>
      </div>
    )
  }
}
