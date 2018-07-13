import React, { Component } from 'react'

export default class SharedMyCampaignsBackAndSaveBTN extends Component {
  render() {
    const {
      submitInProcess, pristine,
      toBackTab, hasBack
    } = this.props

    return (
      <div className={`${hasBack ? "btn-group btn-group-justified" : ""} back-and-save-btn`}>
        {
          hasBack && (
            <button
              className="btn btn-default"
              type="button"
              disabled={submitInProcess}
              onClick={toBackTab}
            >Back</button>
          )
        }
        <button
          className={`btn btn-danger ${submitInProcess && "m-progress"}`}
          type="submit"
          disabled={submitInProcess || pristine}
        >Save</button>
      </div>
    )
  }
}
