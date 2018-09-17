/**
 * Created by Robins Gupta
 * 17th Sept 2018.
 */


import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import { Icon, Label }        from 'semantic-ui-react';

//Custom import
import DropDown from '../ReduxForm/DropDownWithIcon'

const statusOptions = [
  {
    key: 'Pending',
    text: 'Pending',
    value: 'Pending'
  },
  {
    key: 'Completed',
    text: 'Completed',
    value: 'Completed'
  }
];


class Header extends PureComponent {
  static fileInputRef = null
  //Adding Default props
  static defaultProps = {
    attachmentId: "task-detail-attachment-id",
    attachmentLabel: "Attachment",
    moveLabel: "Move",
    subtaskLabel: "Add Subtasks",
    isShareDialogOpened: false,
  };

  static propTypes = {
    task: PropTypes.object,
    openShareDialog: PropTypes.func.isRequired,
    attachmentId: PropTypes.string.isRequired,
    attachmentLabel: PropTypes.string,
    subtaskLabel: PropTypes.string,
    onSubTaskAdded: PropTypes.func.isRequired,
    isShareDialogOpened: PropTypes.bool,
  }

  constructor(props){
    super(props)
    this.onUpload = this.onFileUpload.bind(this)
  }

  onFileUpload(){
    //FIXME: Modify this function
    //12th Sept Robins
    //Add mutation here..
    if (this.fileInputRef.files[0].type === "image/jpeg" || this.fileInputRef.files[0].type === "image/png") {
        let reader = new FileReader();
        reader.onload = (e) => {
            //call action to get the image and content..
            let title = this.fileInputRef.files[0].name;
            let image = e.target.result;
            { props.addAttachment({ title: title, image: image, isImage: true }) }
        };
        reader.readAsDataURL(this.fileInputRef.files[0]);
    }
  }



  render(){

    const {
      attachmentId,
      attachmentLabel,
      moveLabel,
      onSubTaskAdded,
    } = this.props

    return (
      <div className="task-detail-heading-container">
        <div className="task-detail-header-padding-conatiner">
          <DropDown className="task-detail-heading-status-dropdown" options={statusOptions} placeholder="TODO"></DropDown>
          <div className="task-detail-header-right-items">
            <div className="task-detail-header-attachment-container">
                <Label width="4" as="label" htmlFor={attachmentId}>
                    <Icon name="attach" />
                    {attachmentLabel}
                </Label>
                <input id={attachmentId} hidden type="file" onChange={this.onUpload} ref={input=> this.fileInputRef = input }/>
            </div>
            {/* Move Icon */}
            <div className="task-detail-header-move-container">
                <Label width="4" as="label" >
                    <Icon name="share" />
                    {moveLabel}
                </Label>
                <input id={attachmentId} hidden type="file" onChange={this.onUpload} ref={input=> this.fileInputRef = input }/>
            </div>
            {/* Subtasks */}
            <div className="task-detail-header-icon task-detail-header-add-subtask-button-container" onClick={onSubTaskAdded}>
                <Icon name="unordered list" style={{ display: "inline" }}></Icon>
            </div>
            <div className="task-detail-header-icon task-detail-header-add-archive-button-container" onClick={onSubTaskAdded}>
                <Icon name="archive" style={{ display: "inline" }}></Icon>
            </div>
            <div className="task-detail-header-icon task-detail-header-add-share-button-container" onClick={onSubTaskAdded}>
                <Icon name="share alternate" style={{ display: "inline" }}></Icon>
            </div>
            <div className="task-detail-header-icon task-detail-header-add-close-button-container" onClick={onSubTaskAdded}>
                <Icon name="close" style={{ display: "inline" }}></Icon>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Header
