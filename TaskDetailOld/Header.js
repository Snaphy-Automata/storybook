/**
 * Created by Robins
 * 12th Sept 2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon, Label } from 'semantic-ui-react';

//Custom import//
import ShareDialog      from './ShareDialog';

class Header extends Component {
  constructor(props){
    super(props)
    this.onUpload = this.onFileUpload.bind(this)
  }

  static fileInputRef = null
  //Adding Default props
  static defaultProps = {
    attachmentId: "task-detail-attachment-id",
    attachmentLabel: "Add Attachment",
    subtaskLabel: "Add Subtasks",
    isShareDialogOpened: false,
  };

  static propTypes = {
    task: PropTypes.object,
    openShareDialog: PropTypes.func.isRequired,
    attachmentId: PropTypes.string.isRequired,
    attachmentLabel: PropTypes.string,
    subtaskLabel: PropTypes.string,
    onAddSubTasksToList: PropTypes.func.isRequired,
    isShareDialogOpened: PropTypes.bool,
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
      attachmentLabel,
      attachmentId,
      onAddSubTasksToList,
      openShareDialog,
      subtaskLabel,
      isShareDialogOpened,
      onTaskDetailClosed,
    } = this.props

    return (
      <div className="task-detail-header-conatiner">
        <div className="task-detail-share-container">
            <Icon name="share alternate" style={{ display: "inline" }}></Icon>
            <div style={{ display: "inline", marginLeft: '5px', cursor: 'pointer' }} onClick={openShareDialog}>Share</div>
        </div>
        <div className="task-detail-add-attachment-container">
            <Label width="4" as="label" style={{ backgroundColor: "#ffffff", cursor: "pointer", fontSize: "11px" }} htmlFor={attachmentId}>
                <Icon name="attach" />
                {attachmentLabel}
            </Label>
            <input id={attachmentId} hidden type="file" onChange={this.onUpload} ref={input=> this.fileInputRef = input }/>
        </div>
        <div className="task-detail-add-subtask-button-conatiner" onClick={onAddSubTasksToList}>
            <Icon name="unordered list" style={{ display: "inline" }}></Icon>
            <div style={{ display: "inline", marginLeft: '5px', cursor: 'pointer' }}>{subtaskLabel}</div>
        </div>
        <div onClick={onTaskDetailClosed} className="task-detail-close-button-conatiner">
            <Icon name="close" style={{ display: "inline" }}></Icon>
        </div>
        <ShareDialog onClose={openShareDialog} isShareDialogOpened={isShareDialogOpened}></ShareDialog>
      </div>
    )
  }

}



export default Header
