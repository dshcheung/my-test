import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import TextField from '../../../shared/form-elements/text-field'
import ImageField from '../../../shared/form-elements/image-field'
import SelectField from '../../../shared/form-elements/select-field'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesTeamForm",
  validate: (values) => {
    return Validators({
      story: [{ type: "length", opts: { max: 600 } }],
      next_hires: [{ type: "length", opts: { max: 600 } }],
      startup_questionnaire_team_founders: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            avatar: ["filePresences"],
            name: ["presences"],
            position: ["presences"],
            contract: ["presences"],
            salary: ["presences"],
            years_of_experience: ["presences", "noDecimal"],
            linked_in: ["presences"],
          }
        }
      }],
      startup_questionnaire_team_members: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            avatar: ["filePresences"],
            name: ["presences"],
            position: ["presences"],
            contract: ["presences"]
          }
        }
      }],
      startup_questionnaire_team_advisors: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            avatar: [],
            name: ["presences"],
            expertise: ["presences", { type: "length", opts: { max: 600 } }]
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
      "startup_questionnaire_team_founders",
      "startup_questionnaire_team_members",
      "startup_questionnaire_team_advisors",
      "attachments"
    ])
  },
  enableReinitialize: true
})

// startup_questionnaire_team_attributes: [
//   :id,
//   :story,
//   :next_hires,
//   startup_questionnaire_team_founders_attributes: [ :id, :name, :position, :avatar, :contract, :salary, :years_of_experience, :linked_in, :_destroy ],
//   startup_questionnaire_team_members_attributes: [ :id, :name, :position, :avatar, :contract, :_destroy ],
//   startup_questionnaire_team_advisors_attributes: [ :id, :name, :expertise, :avatar, :_destroy ],
//   attachments_attributes: [ :id, :title, :file, :remove_file, :_destroy ]
// ],

export default class MyStartupQuestionnairesTeamForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="story"
            component={TextArea}
            opts={{
              label: "Team story",
              hint: "When did you meet ? What have you done together ? what is the alchimy you experienced ? Why are you the best team to conduct your mission ? Be reflective and personal "
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_founders"
            component={DynamicFieldArray}
            opts={{
              label: "Co-founders and Officers",
              groupName: "Founder/Officer",
              newFieldInit: {
                avatar: '',
                name: '',
                position: '',
                contract: '',
                salary: '',
                years_of_experience: '',
                linked_in: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: ImageField,
                  opts: {
                    title: "Avatar",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    placeholder: "Name"
                  }
                },
                {
                  key: "position",
                  component: TextField,
                  opts: {
                    placeholder: "Position"
                  }
                },
                {
                  key: "contract",
                  component: SelectField,
                  opts: {
                    options: [
                      { key: "full_time", name: "Full-Time" },
                      { key: "part_time", name: "Part-Time" }
                    ],
                    placeholder: "Contract Type",
                    valueKey: "key",
                    nameKey: "name",
                  }
                },
                {
                  key: "salary",
                  component: TextField,
                  opts: {
                    type: "Number",
                    placeholder: "Salary"
                  }
                },
                {
                  key: "years_of_experience",
                  component: TextField,
                  opts: {
                    type: "Number",
                    placeholder: "Years of Experience"
                  }
                },
                {
                  key: "linked_in",
                  component: TextField,
                  opts: {
                    placeholder: "Linkedin"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_members"
            component={DynamicFieldArray}
            opts={{
              label: "Team Members",
              groupName: "Members",
              newFieldInit: {
                avatar: '',
                name: '',
                position: '',
                contract: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: ImageField,
                  opts: {
                    title: "Avatar",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    placeholder: "Name"
                  }
                },
                {
                  key: "position",
                  component: TextField,
                  opts: {
                    placeholder: "Position"
                  }
                },
                {
                  key: "contract",
                  component: SelectField,
                  opts: {
                    options: [
                      { key: "full_time", name: "Full-Time" },
                      { key: "part_time", name: "Part-Time" }
                    ],
                    placeholder: "Contract Type",
                    valueKey: "key",
                    nameKey: "name",
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_advisors"
            component={DynamicFieldArray}
            opts={{
              label: "Notable Advisors & Investors",
              groupName: "Advisors/Investors",
              newFieldInit: {
                avatar: '',
                name: '',
                expertise: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: ImageField,
                  opts: {
                    title: "Avatar (optional)",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    placeholder: "Name"
                  }
                },
                {
                  key: "expertise",
                  component: TextArea,
                  opts: {
                    placeholder: "Expertise"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "Extra Files (Optional)",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
                file_url: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: Select2Field,
                  opts: {
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name",
                    placeholder: "Title"
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
