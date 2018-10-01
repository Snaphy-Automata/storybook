/**
 * Created By Nikita Mittal 4 Aug 2018
 */

import React, { PureComponent } from 'react';
import { Icon } from 'semantic-ui-react';

import './AssignedUserDialog.css';
import TeamCircleIcon from '../TeamCircleIcon';
import CustomCheckbox from '../CustomCheckbox';





class AssignedUserDailog extends PureComponent {

    constructor(props) {
        super(props)
        const { memberIdList } = props
        this.state = {}
        memberIdList.forEach(memberId => {
            this.state = {
                ...this.state,
                [memberId]: false
            }
        })
    }


    componentDidMount() {
        //Initializing member assigned to task..
        const { taskMemberIdList } = this.props
        if (taskMemberIdList && taskMemberIdList.length) {
            taskMemberIdList.forEach(memberId => {
                this.setState({
                    [memberId]: true
                })
            })
        }


    }

    render() {
        console.log("Assigned User dialog getting called", this.props);
        const {
            onClose,
            memberIdList,
            findMemberById,
            taskMemberIdList,
            onUpdateTaskMember,
            loginUser
        } = this.props;
        return (
            <div className="assigned-user-dialog-container">
                <div className="assigned-user-dialog-heading-container">
                    <div className="assigned-user-dialog-heading-text">Assign Users</div>
                    <div className="assigned-user-dialog-close-container" onClick={onClose}>
                        <Icon name="close" />
                    </div>
                </div>
                <div className="assigned-user-dialog-list-container">
                    {
                        memberIdList && memberIdList.length !== 0 && <div>
                            {
                                memberIdList.map((memberId, index) => {
                                    const memberObj = findMemberById(memberId);
                                    const onMemberSelected = () => {
                                        let memberIdDataList = taskMemberIdList
                                        if (this.state[memberId] === true) {
                                            this.setState({
                                                [memberId]: false
                                            })
                                            const memberIndex = memberIdDataList.indexOf(memberId)
                                            memberIdDataList.splice(memberIndex, 1)
                                            onUpdateTaskMember(memberIdDataList)


                                        } else {
                                            this.setState({
                                                [memberId]: true
                                            })
                                            memberIdDataList.push(memberId)
                                            onUpdateTaskMember(memberIdDataList)
                                        }
                                    }

                                    if (memberObj) {
                                        if (index < 4) {
                                            return (
                                                <div key={index} className="assigned-user-dialog-item-container">
                                                    {loginUser && loginUser.id === memberId &&
                                                        <div className="assined-user-dialog-name-container">Assign to me</div>
                                                    }
                                                    {loginUser && loginUser.id !== memberId &&
                                                        <div>
                                                            <TeamCircleIcon className="assined-user-dialog-icon-container" size="mini" title={`${memberObj.firstName}`}></TeamCircleIcon>
                                                            <div className="assined-user-dialog-name-container">{`${memberObj.firstName} ${memberObj.lastName}`}</div>
                                                        </div>
                                                    }
                                                    <div className="assigned-user-dialog-custom-checkbox-container">
                                                        <CustomCheckbox size="mini" className="assigned-user-dialog-checkbox-container" isSelected={this.state[memberId]} color="blue" type="assigneduser" onItemClicked={onMemberSelected}></CustomCheckbox></div>
                                                    </div>
                                                 
                                            )
                                        } else {
                                            return
                                        }
                                    } else {
                                        return
                                    }
                                })
                            }
                        </div>
                    }
                    {memberIdList && memberIdList.length > 4 && <div className="assigned-user-dialog-see-more-container">See More</div>}
                </div>
            </div>

        )
    }

}


export default AssignedUserDailog
