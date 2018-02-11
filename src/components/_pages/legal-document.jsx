import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { gImmovable, G_IMMOVABLE_LEGAL_AGREEMENT } from '../../actions/immovables'

import LoadingSpinner from '../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    legalDocument: _.get(state.immovables, 'legal_agreement.legal_agreements'),
    gImmovableInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class LegalDocument extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  render() {
    const { legalDocument, gImmovableInProcess, route: { docID } } = this.props

    if (gImmovableInProcess) return <LoadingSpinner />

    const doc = _.find(legalDocument, (ld) => {
      return ld.id === docID
    })

    if (doc) {
      return (
        <div id="pages-legal-document" className="container">
          {
            doc && <div dangerouslySetInnerHTML={{ __html: _.get(doc, 'content', '').decode() }} />
          }
        </div>
      )
    } else {
      return (
        <div>Can't find what you are looking for</div>
      )
    }
  }
}
