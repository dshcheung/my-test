import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoadingSpinner from '../../shared/others/loading-spinner'

import { gImmovable, G_IMMOVABLE_LEGAL_AGREEMENT } from '../../../actions/immovables'

const mapStateToProps = (state) => {
  return {
    gLegalInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT),
    legalDocs: _.get(state.immovables, 'legal_agreement.legal_agreements')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Legal extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  render() {
    const { gLegalInProcess, legalDocs, routeParams: { page } } = this.props

    const doc = _.find(legalDocs, { id: page }) || {}

    if (gLegalInProcess) return <LoadingSpinner />

    return (
      <div
        className="col-xs-10 col-xs-offset-1 clearfix margin-top-20 margin-bottom-20"
        dangerouslySetInnerHTML={{ __html: doc.content }}
      />
    )
  }
}
