/**
 * Created by Robins Gupta
 * 1st Oct 2018
 */

import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import { Field, reduxForm }   from 'redux-form';

//Custom import
import DescriptionField from '../ReduxForm/DescriptionField';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import CircularIconBox  from '../CircularIconBox'

class Description extends PureComponent {

  static defaultProps = {
    placeholder:"Write a description Here",
    size: "large",
    rows: 3,
    label: "TaskDescription",
  }

  static propTypes = {
    taskId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }

  constructor(props){
    super(props)
  }


  render(){

    const {
      taskId,
      projectId,
      description,
      error,
      handleSubmit,
      placeholder,
      size,
      rows,
      label,
      submitting,
      pristine,
      onUpdateTaskDescription,
      invalid,
    } = this.props

    return (
      <div onClick={this.onAddLabelBtnClick} className="task-detail-description-container">
        <div className="task-detail-description-icon-container">
          <CircularIconBox  className="task-detail-description-icon" icon="tag" />
        </div>
        <div className="task-detail-description-field">
          <SnaphyForm error={error} onSubmit={handleSubmit}>
            <Field name="description" type="text" placeholder={placeholder} size={size} rows={rows} label={label} component={DescriptionField} invalid={invalid} submitting={submitting} pristine={pristine} descriptionData={description} onUpdateTaskDescription={onUpdateTaskDescription} taskId={taskId}></Field>}
          </SnaphyForm>
        </div>
      </div>
    )
  }
}



const DescriptionForm = reduxForm({
  form: "taskDescription",
})(Description);


export default DescriptionForm
