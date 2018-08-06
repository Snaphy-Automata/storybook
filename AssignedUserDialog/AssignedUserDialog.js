/**
 * Created By Nikita Mittal 4 Aug 2018
 */

import React from 'react';
import {Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import map from 'lodash/map';

import './AssignedUserDialog.css';
import TeamCircleIcon from '../TeamCircleIcon';
import CustomCheckbox from '../CustomCheckbox';
import {memberObj, MEMBERS} from '../../data/taskListData';
import TaskHelper from '../TaskList/helper';

import {getSelectedMemberListAction} from '../TaskList/TaskListActions';



class AssignedUserDailog extends React.Component {


    componentDidMount(){
        this.memberList = MEMBERS;
        let selectedMemberDataList = [];
        if(this.props.task.assignedTo && this.props.task.assignedTo.length){
            this.props.task.assignedTo.forEach((memberId, index) => {
                selectedMemberDataList.push({member: memberId, isSelected: true});
            });
            this.props.getSelectedMemberListAction(selectedMemberDataList);
        }
       
    }

    render() {
        console.log("Member List", MEMBERS);
        const taskHelper = new TaskHelper(this.props.task);
        const checkSelected = (member) =>{
            let selectedMemberList_ = this.props.selectedMemberList;
            let isSelected_ = false;
            if(selectedMemberList_ && selectedMemberList_.length){
               
                selectedMemberList_.forEach((memberData, index) =>{
                    if(memberData.member === member){
                        if(memberData.isSelected){
                            isSelected_ = true;
                        } else{
                            isSelected_ = false;
                        }
                       
                    }
                })
            }
            return isSelected_;
        }

        return(
            <div className="assigned-user-dialog-container">
                <div className="assigned-user-dialog-heading-container">
                    <div className="assigned-user-dialog-heading-text">Assign Users</div>
                    <div className="assigned-user-dialog-close-container" onClick={this.props.onClose}>
                        <Icon name="close"/>
                    </div>
                </div>
                <div className="assigned-user-dialog-list-container">

                    {MEMBERS && MEMBERS.length !== 0 && <div>
                        {
                            map(MEMBERS, function(member, index){
                                if(index<4){

                                    console.log("Blank list getting called");
                                   
                                    return (
                                        <div key={index} className="assigned-user-dialog-item-container">
                                        <TeamCircleIcon className="assined-user-dialog-icon-container" size="mini" title={taskHelper.getMemberName(memberObj, member)}></TeamCircleIcon>
                                        <div className="assined-user-dialog-name-container">{taskHelper.getMemberName(memberObj, member)}</div>
                                        <CustomCheckbox size="mini" className="assigned-user-dialog-checkbox-container" isSelected={checkSelected(member)} userId={member} type="assigneduser"></CustomCheckbox></div>
                                    )
                                } else{
                                    return;
                                }
                                
                            })
                        }
                        
                    </div>
                    }
                    {MEMBERS && MEMBERS.length > 4 && <div className="assigned-user-dialog-see-more-container">See More</div>}
                </div>
            </div>

        )
    }

}

function mapStateToProps(store){
    return {
       selectedMemberList : store.TaskListReducer.selectedMemberList,
    }
}

const mapActionsToProps = {
    getSelectedMemberListAction
}

export default connect(mapStateToProps, mapActionsToProps)(AssignedUserDailog)
