import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import FileDropField from '../../../shared/form-elements/file-drop-field'

@reduxForm({
  form: "MyStartupQuestionnairesAttachmentsForm",
  validate: (values) => {
    return Validators({
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          childFields: {
            title: ["presences"],
            file: ["filePresences"]
          }
        }
      }]

    }, values, ["attachments"])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesAttachmentsForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit} className="clearfix">
          <FieldArray
            name="attachments"
            component={FileDropField}
            opts={{
              showErrors: true,
              label: "1. You still have somtehing more you want to share with us ? (optional)",
              onDeleteField: dMSQAttributes,
              hint: "Please upload here any document not related to the previous tabs data rooms",
              selectOpts: {
                options: this.props.attachmentOptions,
                valueField: "name",
                textField: "name",
                placeholder: "Select a Title",
                filter: true
              }
            }}
          />

          <button
            className={`btn btn-primary pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >CONTINUE</button>
        </form>

        <div className="clearfix margin-top-20">
          <div className="h5">Due Diligence Checklist</div>

          <ul className="px-left-20 fs-12">
            <li className="margin-top-10">
              <b>Organization and Good Standing</b>
              <ol>
                <li>The Company’s Articles of Incorporation and all amendments thereto.</li>
                <li>The Certificate of incorporation or comparable document under which the company or entity was incorporated, established, registered or otherwise created</li>
                <li>The Company’s Bylaws and all amendments thereto (shareholder agreements, investor agreements).</li>
                <li>A certificate of good Standing by the Company Secretary or equivalent</li>
                <li>The Company’s list of shareholders and number of shares held by each.</li>
                <li>The Register of Directors or equivalent list confirming the management of the company or entity</li>
                <li>Copies of agreements relating to options, voting trusts, warrants, puts, calls, subscriptions, and convertible securities.</li>
              </ol>
            </li>

            <li className="margin-top-10">
              <b>Financial Information</b>
              <ol>
                <li>Audited financial statements for the past 3 years (or since business incorporation)</li>
                <li>Profit Tax return or equivalent for Hong Kong and any other relevant jurisdiction, for the past 3 years.</li>
                <li>The most recent unaudited statements, with comparable statements to the prior year.</li>
                <li>Auditor&#39;s letters and replies for the past three years (or since business incorporation).</li>
                <li>Any financial projections, capital budgets and/or strategic plans, business plan.</li>
                <li>Bank statement of the last month (proof of bank account)</li>
                <li>All documents related to credit arrangements or debt, including promissory notes and security agreements, lines of credit agreements.</li>
                <li>Capitalization table</li>
              </ol>
            </li>

            <li className="margin-top-10">
              <b>Material Contracts</b>
              <ol>
                <li>A schedule of all subsidiary, mother company, partnership, or joint venture relationships and obligations, with copies of all related agreements. (Loan agreement, MOUs, Service Agreement, Licensing Agreement)</li>
                <li>Copies of all contracts between the Company and any officers, directors, shareholders or affiliates.</li>
              </ol>
            </li>

            <li className="margin-top-10">
              <b>Employees and Employee Benefits</b>
              <ol>
                <li>A list of employees including positions, current salaries, salaries and bonuses paid during the last three years, and years of service. (Founders and top C-suite : nominative list / For staff : global amount)</li>
                <li>Resumés of key employees and LinkedIn profiles.</li>
                <li>All employee contracts.</li>
                <li>Copies of MPF payments</li>
              </ol>
            </li>

            <li className="margin-top-10">
              <b>Customer Information</b>
              <ol>
                <li>A list of the Company’s ten (10) largest customers in terms of sales with the proportion of total turnover, and a description of sales thereto over a period of two years.</li>
                <li>Any supply or service agreements.</li>
                <li>A description or copy of the Company’s general selling conditions (of which credit terms)</li>
                <li>A copy of KYC procedure</li>
              </ol>
            </li>

            <li className="margin-top-10">
              <b>Supplier Information</b>
              <ol>
                <li>A list of the Company’s ten (10) largest suppliers in terms of purchases with the proportion of total purchasing budget.</li>
                <li>Any service agreements, or binding contracts (exclusivity, time lock) with the suppliers.</li>
              </ol>
            </li>

            <li className="margin-top-10">
              <b>Intellectual Property</b>
              <ol>
                <li>A schedule of trademark and trade names.</li>
                <li>A schedule of copyrights.</li>
                <li>A schedule of domestic and foreign patents and patent applications.</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
