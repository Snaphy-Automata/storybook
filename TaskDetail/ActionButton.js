/**
 * Created by Robins
 * 12th Sept 2018
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import { Field } from 'redux-form';

//Custom import..
import DropDownFieldUI  from '../ReduxForm/DropDownField';

const ActionButton = (props) => {

  const {
    isCompleted,
    onCompletedButtonClick,
    isStatusClicked,
    onStatusChanged,
    statusText,
    onDataChanged,
    statusLabel,
  } = props;

  return (
    <div className="task-detail-task-action-button-conatiner">
      <div className="task-detail-completed-container">
          {!isCompleted &&
          <Button size="tiny" basic onClick={onCompletedButtonClick} style={{ width: "135px" }} className="task-detail-action-button">
              <Icon name="check" />
              Mark Complete
          </Button>}
          {isCompleted &&
          <Button size="tiny" color="green" onClick={onCompletedButtonClick} style={{ width: "135px" }} className="task-detail-action-button">
                <Icon name="check" />
                Completed
          </Button>}
      </div>
      <div className="task-detail-status-container">
          {!isStatusClicked && <Button size="tiny" basic icon labelPosition='right' onClick={onStatusChanged} style={{ width: "127px" }} className="task-detail-action-button">
              <Icon name="angle down" />
              {statusText}
          </Button>}
          {isStatusClicked && <Field options={getOptions()} name="status.title" type="text" placeholder={statusLabel} open={isStatusClicked} size="tiny" onDataChanged={onDataChanged} style={{ width: "127px" }} component={DropDownFieldUI} />}
      </div>
      <div className="task-detail-archive-container">
          <Button size="tiny" basic className="task-detail-action-button">
              <Icon name="archive" />
              Archive
          </Button>
      </div>
    </div>
  )
}


ActionButton.defaultProps = {
  isStatusClicked: false,
  isCompleted: false,
  statusLabel: "In Progress",

}

ActionButton.propTypes = {
  statusText: PropTypes.string,
  isStatusClicked: PropTypes.bool,
  onDataChanged: PropTypes.func.isRequired,
  statusLabel: PropTypes.string,
  isCompleted: PropTypes.bool,
  onCompletedButtonClick: PropTypes.func.isRequired,
  onStatusChanged: PropTypes.func.isRequired,
}


export default ActionButton
