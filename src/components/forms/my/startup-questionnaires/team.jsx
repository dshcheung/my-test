import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextRTE from '../../../shared/form-elements/text-rte'
import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'
import CurrencyField from '../../../shared/form-elements/currency-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesTeamForm",
  validate: (values, props) => {
    if (props.highlightErrors) {
      return Validators({
        story: ["presences", { type: "lengthWord", opts: { max: 600 } }],
        startup_questionnaire_team_members: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: true,
            childFields: {
              avatar: ["filePresences"],
              first_name: ["presences"],
              last_name: ["presences"],
              member_type: ["presences"],
              title: ["presences"],
              bio: ["presences", { type: "lengthWord", opts: { max: 60 } }],
              linkedin: ["presences", "httpLink"],
              commitment: ["presences"],
              salary: ["currencyPresences"],
              equity: ["presences", "percentage"],
            }
          }
        }],
        startup_questionnaire_team_advisors: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              first_name: ["presences"],
              last_name: ["presences"],
              role: ["presences"],
              bio: [{ type: "lengthWord", opts: { max: 25 } }],
              linkedin: ["presences", "httpLink"]
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
        "startup_questionnaire_team_members",
        "startup_questionnaire_team_advisors",
        "attachments"
      ])
    } else {
      return Validators({
        story: [{ type: "lengthWord", opts: { max: 600 } }],
        startup_questionnaire_team_members: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              avatar: ["filePresences"],
              first_name: ["presences"],
              last_name: ["presences"],
              member_type: ["presences"],
              title: ["presences"],
              bio: ["presences", { type: "lengthWord", opts: { max: 60 } }],
              linkedin: ["presences", "httpLink"],
              commitment: ["presences"],
              salary: ["currencyPresences"],
              equity: ["presences", "percentage"],
            }
          }
        }],
        startup_questionnaire_team_advisors: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              first_name: ["presences"],
              last_name: ["presences"],
              role: ["presences"],
              bio: [{ type: "lengthWord", opts: { max: 25 } }],
              linkedin: ["presences", "httpLink"]
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
        "startup_questionnaire_team_members",
        "startup_questionnaire_team_advisors",
        "attachments"
      ])
    }
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesTeamForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="story"
            component={TextRTE}
            opts={{
              showErrors: true,
              label: "1. Team story",
              validationHint: "Max 600 Words",
              hint: "When did you meet ? What have you done together ? what is the alchemy you experienced ? Why are you the best team to conduct your mission ? Be reflective and personal "
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_members"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "2. Co-founders and Officers",
              groupName: "Founder/Officer",
              newFieldInit: {
                avatar: '',
                first_name: '',
                last_name: '',
                member_type: '',
                title: '',
                bio: '',
                linkedin: '',
                commitment: '',
                salary: { currency: '', amount: '' },
                equity: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: FileField,
                  opts: {
                    showErrors: true,
                    label: "Avatar",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "first_name",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "First Name"
                  }
                },
                {
                  key: "last_name",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Last Name"
                  }
                },
                {
                  key: "member_type",
                  component: SelectField,
                  opts: {
                    showErrors: true,
                    label: "Member Type",
                    options: [{ id: "founder", name: "Co-Founder" }, { id: "member", name: "Member" }],
                    valueField: "id",
                    textField: "name"
                  }
                },
                {
                  key: "title",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Job Title"
                  }
                },
                {
                  key: "bio",
                  component: TextRTE,
                  opts: {
                    showErrors: true,
                    label: "Short Bio",
                    validationHint: "Max 60 Words"
                  }
                },
                {
                  key: "linkedin",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Linkedin",
                    placeholder: "https://www.linkedin.com/in/example-person"
                  }
                },
                {
                  key: "commitment",
                  component: SelectField,
                  opts: {
                    showErrors: true,
                    options: [
                      { id: "quarter", name: "25%" },
                      { id: "half", name: "50%" },
                      { id: "three_quarters", name: "75%" },
                      { id: "full", name: "Full Time" }
                    ],
                    placeholder: "Select a Commitment",
                    hint: "25%, 50%, 75% or full-time",
                    label: "Contract Type",
                    valueField: "id",
                    textField: "name",
                  }
                },
                {
                  key: "salary",
                  component: CurrencyField,
                  opts: {
                    showErrors: true,
                    type: "Number",
                    label: "Salary Amount",
                    hint: "This info will not appear on your listed profile"
                  }
                },
                {
                  key: "equity",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    type: "number",
                    label: "Equity Interest",
                    backInputGroup: "%",
                    min: 0,
                    max: 100,
                    step: 1
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_advisors"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "3. Notable Advisors & Investors (optional)",
              groupName: "Advisors/Investors",
              newFieldInit: {
                avatar: '',
                first_name: '',
                last_name: '',
                role: '',
                bio: '',
                linkedin: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: FileField,
                  opts: {
                    showErrors: true,
                    label: "Avatar (optional)",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "first_name",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "First Name"
                  }
                },
                {
                  key: "last_name",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Last Name"
                  }
                },
                {
                  key: "role",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Role Description"
                  }
                },
                {
                  key: "bio",
                  component: TextRTE,
                  opts: {
                    showErrors: true,
                    label: "Short Bio (optional)",
                    validationHint: "Max 25 Words"
                  }
                },
                {
                  key: "linkedin",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Linkedin",
                    placeholder: "https://www.linkedin.com/in/example-person"
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
              label: "4. You have a some pictures to share about your team story (optional)",
              hint: "Upload your document - a picture says more than a thousand words",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
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
