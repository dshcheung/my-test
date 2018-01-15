import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { gImmovable, G_IMMOVABLE_CAMPAIGN_FILTERABLE } from '../../../actions/immovables'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'

const mapStateToProps = (state) => {
  return {
    campaignFilterable: _.get(state.immovables, "campaign_filterable", []),
    gcampaignFilterableInProcess: _.get(state.requestStatus, G_IMMOVABLE_CAMPAIGN_FILTERABLE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "CampaignsSearchForm",
  validate: (values) => {
    return Validators({
      keyword: [],
      filter: [],
      sortBy: [],
      sort: []
    }, values)
  }
})

export default class CampaignsSearchForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "campaign_filterable" })
  }

  reset() {
    this.props.reset()
    this.props.onSubmit()
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, campaignFilterable } = this.props

    return (
      <div id="forms-campaigns-search" className={optClass}>
        <form onSubmit={handleSubmit} className="form-inline">
          <Field
            name="keyword"
            component={TextField}
            opts={{
              type: "text",
              placeholder: "Keyword"
            }}
          />

          {
            /* TODO: Category Immovable
              <Field
                name="filter"
                component={SelectField}
                options={[{ id: 1, name: "Some" }, { id: 2, name: "Thing" }]}
                opts={{
                  placeholder: "Category"
                }}
              />
            */
          }

          <Field
            name="sortBy"
            component={SelectField}
            options={campaignFilterable}
            opts={{
              placeholder: "Sort By"
            }}
          />

          <Field
            name="sort"
            component={SelectField}
            options={[{ id: "ASC", name: "ASC" }, { id: "DESC", name: "DESC" }]}
            opts={{
              placeholder: "Direction"
            }}
          />

          <button
            className={`btn btn-info ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Search
          </button>

          <button
            className="btn btn-danger"
            type="button"
            disabled={submitInProcess}
            onClick={() => { this.reset() }}
          >
            Reset
          </button>
        </form>
      </div>
    )
  }
}
