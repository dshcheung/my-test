import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'

@reduxForm({
  form: "StartupsSearchForm",
  validate: (values) => {
    return Validators({
      keyword: [],
      filter: [],
      sortBy: [],
      sort: []
    }, values)
  }
})

export default class StartupsSearchForm extends Component {
  reset() {
    this.props.reset()
    this.props.onSubmit()
  }

  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-startups-search" className={optClass}>
        <form onSubmit={handleSubmit} className="form-inline">
          <Field
            name="keyword"
            component={TextField}
            opts={{
              type: "text",
              placeholder: "Keyword"
            }}
          />

          <Field
            name="filter"
            component={SelectField}
            options={[{ id: 1, name: "Some" }, { id: 2, name: "Thing" }]}
            opts={{
              placeholder: "Category"
            }}
          />

          <Field
            name="sortBy"
            component={SelectField}
            options={[{ id: "name", name: "Name" }]}
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
            className={`btn btn-danger ${submitInProcess && "m-progress"}`}
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
