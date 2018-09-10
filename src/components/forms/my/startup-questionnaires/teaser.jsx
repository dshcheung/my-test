import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextRTE from '../../../shared/form-elements/text-rte'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupQuestionnairesTeaserForm",
  validate: (values, props) => {
    if (props.highlightErrors) {
      return Validators({
        problem: ["presences", { type: "lengthWord", opts: { max: 100 } }],
        solution: ["presences", { type: "lengthWord", opts: { max: 100 } }],
        make_money: ["presences", { type: "lengthWord", opts: { max: 100 } }],
        solution_benchmark: ["presences", { type: "lengthWord", opts: { max: 200 } }],
        pitch_deck: ["filePresences"],
        startup_questionnaire_highlights: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: true,
            selfMax: 5,
            childFields: {
              occurred_on: ["presences"],
              title: ["presences", { type: "lengthWord", opts: { max: 4 } }],
              content: ["presences", { type: "lengthWord", opts: { max: 20 } }]
            }
          }
        }],
        startup_questionnaire_accelerators: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              name: ["presences"],
              year: ["presences"]
            }
          }
        }],
        startup_questionnaire_media: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            selfMax: 5,
            childFields: {
              logo: ["presences"],
              link: ["presences", "httpLink"]
            }
          }
        }],
        attachments: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              title: ["presences"],
              file: ["filePresences"]
            }
          }
        }]
      }, values, [
        "startup_questionnaire_highlights",
        "startup_questionnaire_media",
        "attachments"
      ])
    } else {
      return Validators({
        problem: [{ type: "lengthWord", opts: { max: 100 } }],
        solution: [{ type: "lengthWord", opts: { max: 100 } }],
        make_money: [{ type: "lengthWord", opts: { max: 100 } }],
        solution_benchmark: [{ type: "lengthWord", opts: { max: 200 } }],
        startup_questionnaire_highlights: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            selfMax: 5,
            childFields: {
              occurred_on: ["presences"],
              title: ["presences", { type: "lengthWord", opts: { max: 4 } }],
              content: ["presences", { type: "lengthWord", opts: { max: 20 } }]
            }
          }
        }],
        startup_questionnaire_accelerators: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              name: ["presences"],
              year: ["presences"]
            }
          }
        }],
        startup_questionnaire_media: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            selfMax: 5,
            childFields: {
              logo: ["presences"],
              link: ["presences", "httpLink"]
            }
          }
        }],
        attachments: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              title: ["presences"],
              file: ["filePresences"]
            }
          }
        }]
      }, values, [
        "startup_questionnaire_highlights",
        "startup_questionnaire_accelerators",
        "startup_questionnaire_media",
        "attachments"
      ])
    }
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesTeaserForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <div className="margin-bottom-20">
            <i>Your answers below will be used to create a teaser for the Professional Investors and catch their interests. You will have space for details in the following sections of this questionnaire</i>
          </div>

          <Field
            name="problem"
            component={TextRTE}
            opts={{
              showErrors: true,
              validationHint: "Max 100 Words",
              label: "1. Problem"
            }}
          />

          <Field
            name="solution"
            component={TextRTE}
            opts={{
              showErrors: true,
              validationHint: "Max 100 Words",
              label: "2. Solution",
            }}
          />

          <Field
            name="make_money"
            component={TextRTE}
            opts={{
              showErrors: true,
              validationHint: "Max 100 Words",
              label: "3. What is your revenue model?",
              hint: "It identifies which revenue source to pursue, how to price the value, and who pays for the value. It is a key component of a company's business model. ex: Advertising, Freemium model, Subscription model, Licensing, Selling data etc..."
            }}
          />

          <Field
            name="solution_benchmark"
            component={TextRTE}
            opts={{
              showErrors: true,
              validationHint: "Max 200 Words",
              label: "4. What is your Unique Selling Point USP",
              hint: "Define your company's unique position in the marketplace. A strong USP clearly articulates a specific benefit - one that other competitors don't offer - that makes you stand out."
            }}
          />

          <Field
            name="pitch_deck"
            component={FileField}
            opts={{
              showErrors: true,
              label: "5. Pitch Deck",
              urlKey: "original",
              hint: "Upload your pitch deck"
            }}
          />

          <Field
            name="business_model"
            component={FileField}
            opts={{
              showErrors: true,
              label: "6. Business Plan (optional)",
              hint: "Upload your business plan",
              urlKey: "original"
            }}
          />

          <FieldArray
            name="startup_questionnaire_highlights"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              maxFields: 5,
              label: "7. Top 5 highlighs / achievements",
              groupName: "Highlight",
              newFieldInit: {
                occurred_on: '',
                title: '',
                content: ''
              },
              onDeleteField: dMSQAttributes,
              validationHint: "Max 5 main achievements",
              hint: "For each, we need a 4 words max title, a date (optional, quarter/year), a nominal sentence of 20 words max. Make them count !",
              dynamicFields: [
                {
                  key: "occurred_on",
                  component: DateTimePicker,
                  opts: {
                    showErrors: true,
                    label: "Occured On",
                    time: false,
                    format: "YYYY/MM",
                    views: ["year", "decade"]
                  }
                },
                {
                  key: "title",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Title",
                    validationHint: "Max 4 Words"
                  }
                },
                {
                  key: "content",
                  component: TextRTE,
                  opts: {
                    showErrors: true,
                    label: "Content",
                    validationHint: "Max 20 Words"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_accelerators"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "8. Accelerators (optional)",
              groupName: "Accelerator",
              newFieldInit: {
                name: '',
                year: '',
                batch: ''
              },
              onDeleteField: dMSQAttributes,
              hint: "Provide us with the accelerator(s) your startup has been involve with",
              dynamicFields: [
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Name",
                    placeholder: "Betatron"
                  }
                },
                {
                  key: "year",
                  component: DateTimePicker,
                  opts: {
                    showErrors: true,
                    placeholder: "Select the year",
                    label: "Year",
                    time: false,
                    format: "YYYY",
                    views: ["decade"],
                    max: moment().toDate()
                  }
                },
                {
                  key: "batch",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Batch (Optional)",
                    placeholder: "YC2018"
                  }
                },
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_media"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              maxFields: 5,
              label: "8. Media (optional)",
              groupName: "Media",
              newFieldInit: {
                logo: '',
                link: ''
              },
              onDeleteField: dMSQAttributes,
              validationHint: "Max 5 media",
              hint: "Provide us with the link to the article and the logo of the media",
              dynamicFields: [
                {
                  key: "logo",
                  component: FileField,
                  opts: {
                    showErrors: true,
                    label: "Add Image for Thumbnail",
                    urlKey: "original"
                  }
                },
                {
                  key: "link",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    type: 'url',
                    label: "Link",
                    placeholder: "https://website.com"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "9. Can you share with us some more shining visuals to illustrate your teaser? (optional)",
              hint: "A video or pictures showing your company, your team, your product, your vision, your story... all of them... that is your show. As long as it stays shorter than 1min and 30 seconds / 5 pictures",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: SelectField,
                  opts: {
                    showErrors: true,
                    label: "Title",
                    options: this.props.attachmentOptions,
                    valueField: "name",
                    textField: "name",
                    filter: true,
                    allowCreate: true
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    showErrors: true,
                    label: "File",
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
