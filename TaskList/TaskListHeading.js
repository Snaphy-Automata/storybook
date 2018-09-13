import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react'
import { SortableHandle } from 'react-sortable-hoc';

import './TaskList.css';


/**
 * Drag handle
 */
const DragHandle = SortableHandle(() => (
    <div className="task-list-heading-drag-icon-container">
        <Icon className="task-list-heading-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-heading-drag-icon" name="ellipsis vertical"></Icon>
    </div>
)); // This can be any component you want

const TaskListHeading = (props) => {
    const {
        heading,
        onArchiveClicked,
        defaultText,
        type,
        items,
        sectionId,
        subHeadingComponent,
        headingClassName,
        onNewTaskAdded,
        index,
        protectedName,
        isCollapsed,
        onSectionStateChanged,
        isEmptySection,
        onAddNewtaskClicked,
        isAddNewTaskVisible,
        onSectionCollapsed,
        populateCollapsedSectionArray,
        className,
        iconClassName,
    } = props;

    let containerClassName = `task-list-heading-parent-wrapper`;
    if(className){
      containerClassName = `${containerClassName} ${className}`;
    }

    let iconClassNameStr = `task-list-heading-drag-angle-icon`;
    if(iconClassName){
      iconClassNameStr = `${iconClassNameStr} ${iconClassName}`;
    }

    const getIcon = function () {
        if (!isCollapsed) {
            return `angle down`
        } else {
            return `angle right`
        }
    }
    let headingClassName_ = headingClassName || "";
    headingClassName_ = `task-list-heading-container ${headingClassName_}`

    const onStateChanged = () => {
        //populateCollapsedSectionArray(sectionId);
        let emptySectionId = null;
        if(isEmptySection){
            emptySectionId = sectionId;
        }
        onSectionStateChanged(sectionId, index, isCollapsed, emptySectionId);
        //onSectionCollapsed();
    }

    const onAddNewTaskClicked = () => {
        onNewTaskAdded(sectionId, index);
    }

    const getDragContainerClassName = () => {
        let className = "task-list-heading-drag-container";
        if (protectedName !== "active_tasks") {
            className = `${className} task-list-heading-drag-cursor`;
        }

        return className;
    }

    const onWriteTask = () => {
        onAddNewtaskClicked(index, sectionId);
    }

    return (
        <div>
            <div className={containerClassName}>
                <div className={iconClassNameStr}>
                    <div className={getDragContainerClassName()}>
                        {protectedName !== "active_tasks" && <DragHandle />}
                    </div>
                    <div onClick={onStateChanged}>
                        <div className="task-list-heading-icon"> <Icon style={{ margin: 0 }} name={getIcon()} ></Icon></div>
                    </div>
                </div>

                <div className={headingClassName_}>
                    <div className={"task-list-heading-wrapper"}>

                        <div className="task-list-heading-title">
                            {(!type || type === "fixed") && <div>{heading}</div>}
                            {type === "custom" && <Input transparent placeholder="Write Section Name" defaultValue="My Bugs" />}
                        </div>
                    </div>
                    {
                        !subHeadingComponent &&
                        <div className="task-list-sub-heading-wrapper">
                            <div className="task-list-heading-archive-container on-subheading-hover" >
                                <div>
                                    <Icon style={{ display: "inline" }} name="archive" onClick={onArchiveClicked}></Icon>
                                    <div style={{ display: "inline", marginLeft: "5px" }} onClick={onArchiveClicked}>Archive</div>
                                </div>

                            </div>
                            <div className="task-list-heading-add-new-container on-subheading-hover" >
                                <div onClick={onAddNewTaskClicked}>
                                    <Icon style={{ display: "inline" }} name="clipboard outline"></Icon>
                                    <div style={{ display: "inline", marginLeft: "5px" }} >Add New Task</div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        subHeadingComponent && subHeadingComponent
                    }
                    {
                        !isCollapsed && !items && !subHeadingComponent &&
                        <div style={{ padding: "10px 15px 10px 15px", fontWeight: 500, color: "#9e9e9e", fontSize: 16 }}>
                            {defaultText}
                        </div>
                    }
                    {
                        !isCollapsed && items && items.length === 0 && !subHeadingComponent &&
                        <div style={{ padding: "10px 15px 10px 15px", fontWeight: 500, color: "#9e9e9e", fontSize: 16 }}>
                            {defaultText}
                        </div>
                    }
                </div>
            </div>
            {
                isEmptySection && !isCollapsed && isAddNewTaskVisible &&
                <div className="task-list-item-delayed-wrapper" style={{backgroundColor:"#fcfcfc"}} onClick={onWriteTask}>
                    <div className="task-list-item-container" >
                    <div className="task-item-delayed-block"></div>
                        <div className="task-list-item-side-bar-container">
                            <div className={'task-list-item-side-line'}>
                            </div>
                            <div className={'task-list-add-item-icon'}>
                            <Icon size="small" name="add"></Icon>
                            </div>
                        </div>

                        <div className="task-list-item-new-task-title" style={{color:"#9e9e9e", paddingLeft:"2px"}}>
                                Add New Task
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

// Retrieve data from store as props
function mapStateToProps(store, props) {
    const modelDataReducer = store.ModelDataReducer;
    const sectionState = modelDataReducer.sectionState[props.sectionId];
    let isCollapsed = false;
    if (sectionState && sectionState.isCollapsed) {
        isCollapsed = true;
    }

    return {
        isCollapsed,
        isAddNewTaskVisible : store.ModelDataReducer.isAddNewTaskVisible
    };
}

//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here

};

TaskListHeading.propTypes = {
    heading: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, //custom || fixed
    sectionId: PropTypes.string,
    onTabButtonClick: PropTypes.func, //Func will listen to tab button click.
}


export default connect(mapStateToProps, mapActionsToProps)(TaskListHeading);
