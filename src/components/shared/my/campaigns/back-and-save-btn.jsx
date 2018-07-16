import React, { Component } from 'react'

export default class SharedMyCampaignsBackAndSaveBTN extends Component {
  render() {
    const {
      submitInProcess, pristine,
      toBackTab, hasBack
    } = this.props

    return (
      <div className="btn-group btn-group-justified back-and-save-btn">
        <button
          className="btn btn-default"
          type="button"
          disabled={submitInProcess || !hasBack}
          onClick={toBackTab}
        >Back</button>

        <button
          className={`btn btn-danger ${submitInProcess && "m-progress"}`}
          type="submit"
          disabled={submitInProcess || pristine}
        >Save</button>
      </div>
    )
  }
}
