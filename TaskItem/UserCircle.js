import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


//import actions..
import { onOpenAssignedUserDialogAction } from '../TaskList/TaskListActions'
import { findUserById, updateTaskMembersAction } from '../../baseComponents/GridView/components/ModelData/User/action'

//import css
import "../TaskList/TaskList.css"

//import components
import PopupField from '../PopupField'
import AssignedUserDialog from '../AssignedUserDialog'
import TeamCircleIcon from '../TeamCircleIcon'


class UserCircle extends PureComponent {

    static propTypes = {
        //props
        taskId: PropTypes.string.isRequired,
        isScrolling: PropTypes.bool.isRequired,
        memberIdList: PropTypes.array,

        //action
        onOpenAssignedUserDialogAction: PropTypes.func,
        updateTaskMembersAction: PropTypes.func,
        findUserById: PropTypes.func,
        //redux
        isAssinedUserDialogOpened: PropTypes.bool,
        taskMemberList: PropTypes.array,
        loginUserId: PropTypes.string.isRequired
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props)
        this.onAssignedUserDialogStateChange = this._onAssignedUserDialogStateChange.bind(this)
        this.onOpenAssignedUserDialog = this._onOpenAssignedUserDialog.bind(this)
        this.onCloseAssignedUserDialog = this._onCloseAssignedUserDialog.bind(this)
        this.onUpdateTaskMember = this._onUpdateTaskMember.bind(this)
    }


    _onAssignedUserDialogStateChange = (stateValue) => {
        const { taskId, onOpenAssignedUserDialogAction } = this.props
        onOpenAssignedUserDialogAction(stateValue, taskId)
    }

    _onOpenAssignedUserDialog = (e) => {
        const { taskId, onOpenAssignedUserDialogAction } = this.props
        onOpenAssignedUserDialogAction(true, taskId)
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    _onCloseAssignedUserDialog = (e) => {
        const { taskId, onOpenAssignedUserDialogAction } = this.props
        onOpenAssignedUserDialogAction(false, taskId)
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    _onUpdateTaskMember = (memberIdList) => {
        const { taskId, updateTaskMembersAction, updateTaskMembersMutation } = this.props
        updateTaskMembersAction(taskId, memberIdList, updateTaskMembersMutation)
        //onOpenAssignedUserDialogAction(true, taskId)
    }




    render() {
        const { isScrolling, taskMemberList, findUserById, memberIdList, loginUserId, isAssinedUserDialogOpened } = this.props
        let userObj = {}, tooltip = ""
        //FIXME: Shift this to helper file..
        if (!taskMemberList.length) {
            userObj = {
                icon: 'user',
                tooltip: "Assign this task"
            }
        } else {
            const member = findUserById(taskMemberList[0])
            let memberName
            if (member) {
                memberName = `${member.firstName}`
                if (member.lastName) {
                    memberName = `${memberName} ${member.lastName}`
                }

                if (taskMemberList.length < 2) {

                    userObj = {
                        title: memberName,
                        tooltip: memberName
                    }

                } else {
                    if(!isScrolling){
                        userObj = {
                            icon : 'users',
                            tooltip: tooltip
                        }
                        taskMemberList.forEach((assignedId, index) => {
                            const member = findUserById(assignedId)
                            if (member && member.firstName) {
                              if (index === 0) {
                                tooltip = `${member.firstName}`;
                              } else {
                                tooltip = `${tooltip}, ${member.firstName}`;
                              }
                    
                              if (member.lastName) {
                                tooltip = `${tooltip} ${member.lastName}`;
                              }
                    
                            }
                          });
                          userObj = {
                              icon : 'users',
                              tooltip: tooltip
                          }
                    }
                }
            }
        }
        return (
            <div className={'task-list-item-icon'}>
                    <PopupField
                        triggerComponent={
                            <div onClick={this.onOpenAssignedUserDialog}>
                                <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={userObj.thumbnailUrl} title={userObj.title} icon={userObj.icon} />
                            </div>
                        }
                        contentComponent={<AssignedUserDialog onClose={this.onCloseAssignedUserDialog} findMemberById={findUserById} memberIdList={memberIdList} taskMemberIdList={taskMemberList} onUpdateTaskMember={this.onUpdateTaskMember} loginUserId={loginUserId} />}
                        position="bottom center"
                        style={{ width: "242px", padding: "0" }}
                        isDialogOpened={isAssinedUserDialogOpened}
                        basic={false}
                        onDialogStateChange={this.onAssignedUserDialogStateChange}
                    />

            </div>
        )
    }
}


function mapStateToProps(store, props) {
    const assignedUserDialog = store.TaskListReducer.assignedUserDialog;
    let isAssinedUserDialogOpened = false;
    if (assignedUserDialog && assignedUserDialog.taskId === props.taskId) {
        isAssinedUserDialogOpened = true;
    }
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    const taskMemberList = task.assignedTo

    return {
        isAssinedUserDialogOpened,
        taskMemberList,
        loginUserId: store.LoginReducer.login.id
    }
}



const mapActionsToProps = {
    onOpenAssignedUserDialogAction,
    updateTaskMembersAction,
    findUserById

}

export default connect(mapStateToProps, mapActionsToProps)(UserCircle);