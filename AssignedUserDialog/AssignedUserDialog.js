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
//import {memberObj, MEMBERS} from '../../data/taskListData';
import TaskHelper from '../TaskList/helper';

import {getTaskMembersAction} from '../../baseComponents/GridView/components/ModelData/ModelDataActions';




class AssignedUserDailog extends React.Component {


    componentDidMount(){
        
        // this.memberList = MEMBERS;
        // let selectedMemberDataList = [];
        // if(this.props.taskMemberList && this.props.task.assignedTo.length){
        //     this.props.task.assignedTo.forEach((memberId, index) => {
        //         selectedMemberDataList.push({member: memberId, isSelected: true});
        //     });
        //     this.props.getSelectedMemberListAction(selectedMemberDataList);
        // }
       
    }

    render() {
        console.log("Assigned User dialog getting called");
        const {
            task,
            onClose,
            memberIdList,
            findMemberById,
            onQuickUpdateTaskMembers,
            taskMemberList,
            getTaskMembersAction
        } = this.props;
        //console.log("Task memeber List", taskMemberList);
        //console.log("Member List", MEMBERS);
        // const taskHelper = new TaskHelper(this.props.task);
        // const checkSelected = (member) =>{
        //     let selectedMemberList_ = this.props.selectedMemberList;
        //     let isSelected_ = false;
        //     if(selectedMemberList_ && selectedMemberList_.length){
               
        //         selectedMemberList_.forEach((memberData, index) =>{
        //             if(memberData.member === member){
        //                 if(memberData.isSelected){
        //                     isSelected_ = true;
        //                 } else{
        //                     isSelected_ = false;
        //                 }
                       
        //             }
        //         })
        //     }
        //     return isSelected_;
        // }

        return(
            <div className="assigned-user-dialog-container">
                <div className="assigned-user-dialog-heading-container">
                    <div className="assigned-user-dialog-heading-text">Assign Users</div>
                    <div className="assigned-user-dialog-close-container" onClick={this.props.onClose}>
                        <Icon name="close"/>
                    </div>
                </div>
                <div className="assigned-user-dialog-list-container">
                {
                    memberIdList && memberIdList.length!==0 && <div>
                       {
                           map(memberIdList, function(memberId, index){
                               const memberObj = findMemberById(memberId);
                               const getSelectedMember = () => {
                                   let isSelected = false;
                                   if(taskMemberList && taskMemberList.length){
                                       for(var i=0;i<taskMemberList.length;i++){
                                           if(taskMemberList[i] === memberId){
                                               isSelected = true;
                                           }
                                       }
                                   }
                                   return isSelected;
                               }

                               const onTaskMemberSelected = () => {
                                   let temptaskMemberList = [];
                                   if(taskMemberList){
                                       temptaskMemberList = [...taskMemberList];
                                       if(temptaskMemberList.length){
                                        
                                           for(var i=0;i<temptaskMemberList.length;i++){
                                               if(temptaskMemberList[i] === memberId){
                                                   temptaskMemberList.splice(i, 1);
                                               }
                                           }
                                       }
                                       if(temptaskMemberList.length === taskMemberList.length){
                                           temptaskMemberList.push(memberId);
                                       }
                                   }
                                   //console.log("Task Member List before action", temptaskMemberList);
                                   getTaskMembersAction(task.id, temptaskMemberList);
                                   onQuickUpdateTaskMembers(task.id, memberId);
                               }
                               //console.log("MemberObj data", memberObj);
                               if(memberObj){
                                   if(index < 4){
                                    return (
                                        <div key={index} className="assigned-user-dialog-item-container">
                                        <TeamCircleIcon className="assined-user-dialog-icon-container" size="mini" title={`${memberObj.firstName}`}></TeamCircleIcon>
                                        <div className="assined-user-dialog-name-container">{`${memberObj.firstName} ${memberObj.lastName}`}</div>
                                        <CustomCheckbox size="mini" className="assigned-user-dialog-checkbox-container" isSelected={getSelectedMember()} color="blue" type="assigneduser" onItemClicked={onTaskMemberSelected}></CustomCheckbox></div>
                                    ) 
                                   } else{
                                       return 
                                   }
                               } else{
                                   return 
                               }
                           })
                       }
                    </div>
                }

                    {/* {MEMBERS && MEMBERS.length !== 0 && <div>
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
                    {MEMBERS && MEMBERS.length > 4 && <div className="assigned-user-dialog-see-more-container">See More</div>} */}
                </div>
            </div>

        )
    }

}

function mapStateToProps(store){
    return {
       //selectedMemberList : store.TaskListReducer.selectedMemberList,
    }
}

const mapActionsToProps = {
    getTaskMembersAction,
}

export default connect(mapStateToProps, mapActionsToProps)(AssignedUserDailog)
