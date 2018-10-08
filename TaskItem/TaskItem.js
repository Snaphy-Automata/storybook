import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input, Popup } from 'semantic-ui-react'
import { SortableHandle } from 'react-sortable-hoc';
//Custom import..
import '../TaskList/TaskList.css';


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
import NewTask from './NewTask';

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

    static defaultProps = {
        isAutoFocus : false
    }

    constructor(props) {
        super(props);
        const { isLastTask } = props;
        if (isLastTask) {
            this.lastTaskStyle = {
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px"
            }
        }
        this.getWrapperClassName = this.getWrapperClassName.bind(this);
        this.taskItemContainerClassName = `task-list-item-container`;
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
            isActiveTaskSection,
            taskId,
            isAutoFocus,
            onTaskSelected,
            sectionId,
            index,
            previousItemId
        } = this.props;

        return (

            <div style={{ ...style, ...this.lastTaskStyle }} className={this.getWrapperClassName()}>
                {!isNew && 
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
                { isNew && 
                    <NewTask taskId ={taskId} isAutoFocus={isAutoFocus} onTaskSelected= {onTaskSelected} index={index} sectionId={sectionId} previousItemId={previousItemId}/>
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
    let isAutoFocus = false

    return {
        selectedTaskId,
        isActiveTaskSection: isActiveTask,
        isAutoFocus

    }


}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    //Model Data Actions..

};


export default connect(mapStateToProps, mapActionsToProps)(TaskItem);
