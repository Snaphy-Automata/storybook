import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input, Popup } from 'semantic-ui-react'
import { SortableHandle } from 'react-sortable-hoc';
//Custom import..
import '../TaskList/TaskList.css';
import InputField from '../ReduxForm/InputField';

import {
    onTitleChangeAction,
} from '../../baseComponents/GridView/components/ModelData/Task/action'


//Import Selectors..
import { getTaskData } from '../../baseComponents/GridView/components/ModelData/Task/selector'
import UserCircle from './UserCircle';
import TaskDate from './TaskDate';
import TaskItemTitle from './TaskItemTitle'
import TaskStats from './TaskStats';
import TaskDuration from './TaskDuration';
import TaskItemLabels from './TaskItemLabels';
import TaskIndicator from './TaskIndicator';
import TaskStatus from './TaskStatus';

/**
 * Drag handle
 */
const DragHandle = SortableHandle(() => (
    <div className="task-list-item-drag-icon-container">
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
    </div>
)); // This can be any component you want

class TaskItem extends PureComponent {
    static lastTaskStyle = {};
    static taskItemContainerClassName = null;

    static taskHelper = null;
    static iconObj = null;
    constructor(props) {
        super(props);
        const { isLastTask } = props;
        if (isLastTask) {
            this.lastTaskStyle = {
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px"
            }
        }
        this.state = {
            isEditable: false
        }
        this.getWrapperClassName = this.getWrapperClassName.bind(this);
        this.taskItemContainerClassName = `task-list-item-container`;
        this.onWriteTask = this.onWriteTask.bind(this);

        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onTitleFocus = this.onTitleFocus.bind(this);
        this.onTitleUpdate = this._onTitleUpdate.bind(this)
        this.onEnterData = this.onEnterData.bind(this);
        this.onSelectItem = this._onSelectItem.bind(this)
    }

    getWrapperClassName() {
        const { className, selectedTaskId, taskId } = this.props;
        let wrapperClassName = className ? className + " task-list-item-wrapper" : "task-list-item-wrapper";
        if (selectedTaskId) {
            if (selectedTaskId === taskId) {
                wrapperClassName = `${wrapperClassName} active`
            }
        }

        return wrapperClassName;
    }


    _onTitleUpdate(title) {
        const {
            taskId,
            onTitleChangeAction,
        } = this.props
        //console.log("On Update Title", taskId)
        onTitleChangeAction(taskId, title)
    }


    onWriteTask(e) {
        const { taskId, onTaskSelected } = this.props
        this.setState({
            isEditable: true
        })
        onTaskSelected(taskId)
        e.preventDefault()
        // onAddNewtaskClicked(index, task.sectionId);
    }

    onTitleBlur = (value) => {
        //console.log(" On Title Blur getting called")
        if (!value || value === "") {
            this.setState({
                isEditable: false
            })
        } else {
            //generate the id..
            //save the value to database..


        }


    }

    onTitleFocus = () => {
        // const { onTaskItemFocusEvent, task } = this.props;
        // onTaskItemFocusEvent(task);

    }

    onEnterData = (key, value) => {
        const { task, onTaskItemBlurEvent, onEnterNextNewTask, index } = this.props;
        if (key === "Enter") {
            if (value && value !== "") {
                task.title = value;
                let taskObj = { ...task };
                onTaskItemBlurEvent(taskId, taskObj, index, "add");
                onEnterNextNewTask(index, task.sectionId);
            }
        }
    }



    _onSelectItem = () => {
        const { taskId, onTaskSelected } = this.props
        //console.log(" On task Selected")
        onTaskSelected(taskId)
    }









    render() {
        const {
            style,
            isNew,
            isScrolling,
            memberIdList,
            isEmpty,
            isActiveTaskSection,
            title,
            taskId,
        } = this.props;

        const getDelayedClassName = () => {
            let delayedClassName = null;
            delayedClassName = `task-item-delayed-block`;

            return delayedClassName
        }

        const { isEditable } = this.state


        return (

            <div style={{ ...style, ...this.lastTaskStyle }} className={this.getWrapperClassName()}>
                {!isNew && !isEmpty &&
                    <div className="task-list-item-delayed-wrapper">
                        <div className={this.taskItemContainerClassName} >
                            <TaskIndicator taskId = {taskId} isScrolling={isScrolling} isActiveTaskSection={isActiveTaskSection}/>
                            <div className="task-list-item-side-bar-container">
                                <div className={'task-list-item-side-line'}>
                                    <DragHandle />
                                </div>
                                <UserCircle taskId={taskId} isScrolling={isScrolling} memberIdList={memberIdList} />
                            </div>

                            <div className="task-list-item-title" onClick={this.onSelectItem}>
                                <TaskItemTitle taskId={taskId}></TaskItemTitle>
                            </div>

                            <div className="task-list-item-other-container" onClick={this.onSelectItem}>
                                <div className="task-list-item-status-duration-container">
                                    {isActiveTaskSection && 
                                       <TaskStatus taskId = {taskId} />
                                    }
                                    {!isActiveTaskSection &&
                                        <TaskDuration taskId={taskId}/>
                                    }
                                </div>


                                <TaskStats taskId={taskId} />
                                <TaskItemLabels taskId={taskId} isScrolling={isScrolling}/>
                                <TaskDate taskId={taskId} />

                            </div>
                            {/* Other Container div end */}
                        </div>
                    </div>
                }
                {
                    isEmpty && !isEditable &&
                    <div className="task-list-item-add-new-task-container" style={{ backgroundColor: "#fcfcfc" }} onMouseDown={this.onWriteTask}>
                        <div className={this.taskItemContainerClassName} >
                            <div className={getDelayedClassName()}></div>
                            <div className="task-list-item-side-bar-container">
                                <div className={'task-list-item-side-line'}>
                                </div>
                                <div className={'task-list-add-item-icon'}>
                                    <Icon size="small" name="add"></Icon>
                                </div>
                            </div>

                            <div className="task-list-item-new-task-title" style={{ color: "#9e9e9e", paddingLeft: "2px" }}>
                                Add New Task
                        </div>
                        </div>
                    </div>
                }
                {
                    isEmpty && isEditable &&
                    <div className="task-list-item-delayed-wrapper">
                        <div className={this.taskItemContainerClassName} >
                            <div className={getDelayedClassName()}></div>
                            <div className="task-list-item-side-bar-container">
                                <div className={'task-list-item-side-line'}>
                                </div>
                                <div className={'task-list-item-icon'}>
                                </div>
                            </div>

                            <div className="task-list-item-new-task-title">
                                <div className="task-list-item-new-task-container">
                                    <InputField onChange={this.onTitleUpdate} value={title} placeholder="Write Task" transparent autoFocus fluid className="task-list-item-new-task" onBlurEvent={this.onTitleBlur} onFocusEvent={this.onTitleFocus} onKeyPressEvent={this.onEnterData} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


function mapStateToProps(store, props) {
    const modelDataReducer = store.ModelDataReducer;
    let selectedTaskId = modelDataReducer.selectedTaskId;

    const {
        isActiveTask,
    } = getTaskData(store, props)




    return {
        selectedTaskId,
        isActiveTaskSection: isActiveTask,

    }


}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    //Model Data Actions..
    onTitleChangeAction,

};


export default connect(mapStateToProps, mapActionsToProps)(TaskItem);
