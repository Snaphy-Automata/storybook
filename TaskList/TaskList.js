import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import Promise from 'bluebird';
import {SortableContainer, arrayMove, SortableElement} from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'
import { find } from 'graphql';
import { is } from 'immutable';

let ListRef = null;


const isTaskLast = (activeTasks, index, findTaskById) => {
    const nextTaskIndex = index + 1;
    if(index === 0 && activeTasks.length === 1){
        return true
    }else if(index+1 === activeTasks.length){
        return true
    }else{
        const nextTaskId = activeTasks[nextTaskIndex];
        const nextTask = findTaskById(nextTaskId);
        if(nextTask){
            return nextTask.type === "section";
        } else{
            return true;
        }

    }
};

const isSectionEmpty = (activeTasks, index, findTaskById) => {
    const itemId = activeTasks[index];
    const item = findTaskById(itemId);
    if(item && item.type === "section"){
        const nextItemIndex = index +1;
        const nextItemId = activeTasks[nextItemIndex];
        const nextItem = findTaskById(nextItemId);
        //console.log("Is Section empty", item, nextItem);
        if(nextItem){
            if(nextItem.type === "section"){
                return true;
            }
        }
    }
    return false;
}


const isSectionCollapsed = (collapsedSectionList, sectionId) => {
    //console.log("Collapsed Section List", collapsedSectionList);
    if(collapsedSectionList && collapsedSectionList.length){
        for(var i=0;i<collapsedSectionList.length;i++){
            if(collapsedSectionList[i] === sectionId){
                return true;
            }
        }

    }
    return false;
}




const renderRow = (activeTasks, findTaskById, onNewTaskAdded, onTaskSelected, onTaskItemBlurEvent, onTaskItemFocusEvent, onEnterNextNewTask, onSectionStateChanged, onAddNewtaskClicked, onSectionCollapsed, populateCollapsedSectionArray, statusObj, findMemberById, findLabelById, onQuickUpdateDate, memberIdList, onQuickUpdateTaskMembers) => {

    const rowRenderer =  (props)  => {
        const {
            index,       // Index of row
            isScrolling, // The List is currently being scrolled
            isVisible,   // This row is visible within the List (eg it is not an overscanned row)
            key,         // Unique key within array of rendered rows
            parent,      // Reference to the parent List (instance)
            style,       // Style object to be applied to row (to position it);
        } = props;
        //console.log("Row Render Props");
        const taskOrSectionId  = activeTasks[index];
        const taskOrSection    = findTaskById(taskOrSectionId);
        //Check whther this section is the first one..
        const isFirst    = activeTasks[0] === taskOrSectionId;
        const isLastTask = isTaskLast(activeTasks, index, findTaskById);
        const isEmptySection = isSectionEmpty(activeTasks, index, findTaskById);


        return (
            <div style={style}  key={key}>
            {
                taskOrSection && taskOrSection.type === "section" &&
                <SortableHeading isEmptySection={isEmptySection} isFirst={isFirst} index={index} indexValue={index} section={taskOrSection} onNewTaskAdded={onNewTaskAdded} onSectionStateChanged={onSectionStateChanged} onAddNewtaskClicked={onAddNewtaskClicked} onSectionCollapsed={onSectionCollapsed} populateCollapsedSectionArray={populateCollapsedSectionArray}></SortableHeading>
            }
            {
                taskOrSection && taskOrSection.type === "task" &&
                <SortableTask
                isLastTask={isLastTask}
                index={index}
                indexValue={index}
                taskId={taskOrSectionId}
                task={taskOrSection}
                activeTasks={activeTasks}
                onTaskSelected={onTaskSelected}
                onTaskItemBlurEvent={onTaskItemBlurEvent}
                onTaskItemFocusEvent={onTaskItemFocusEvent}
                onEnterNextNewTask={onEnterNextNewTask}
                onAddNewtaskClicked={onAddNewtaskClicked}
                activeTasks={activeTasks}
                statusObj={statusObj}
                findMemberById={findMemberById}
                findLabelById={findLabelById}
                onQuickUpdateDate={onQuickUpdateDate}
                memberIdList={memberIdList}
                onQuickUpdateTaskMembers={onQuickUpdateTaskMembers}
                ></SortableTask>
            }
            </div>
        )
    }
    return rowRenderer;
}


const SortableHeading = SortableElement((props)=>{
    //console.log("Sortable heading props", props);
    const {style, section, isFirst, onNewTaskAdded, indexValue, onSectionStateChanged, isEmptySection, onAddNewtaskClicked, onSectionCollapsed, populateCollapsedSectionArray} = props;

   // console.log("Heading props", style);

    return (
        <div  style={{width:"100%"}}>
            {!isFirst && <div className="task-list-section-seperator"></div>}
            <div className="task-list-section-wrapper" style={{background: "#fff", ...style}}>
                <TaskListHeading isEmptySection={isEmptySection} index={indexValue} sectionId={section.id} id={section.id} heading={section.title} protected={section.isProtected} type="fixed" onNewTaskAdded={onNewTaskAdded} protectedName={section.protectedName} onSectionStateChanged={onSectionStateChanged} onAddNewtaskClicked={onAddNewtaskClicked} onSectionCollapsed={onSectionCollapsed} populateCollapsedSectionArray={populateCollapsedSectionArray}/>
            </div>
        </div>

    )
});



const SortableTask = SortableElement((props)=>{
    //console.log("Sortable task props", props);
    const {style, activeTasks, isLastTask, className, index, taskId, task, onTaskSelected, onTaskItemBlurEvent, onTaskItemFocusEvent, indexValue, onEnterNextNewTask, onAddNewtaskClicked, statusObj, findMemberById, findLabelById, onQuickUpdateDate, memberIdList, onQuickUpdateTaskMembers} = props;
    //console.log("Sortable Task Props", props);
    let isActiveTaskSection = false;
    if(task && task.type === "section" && task.protectedName === "active_tasks"){
      isActiveTaskSection = true;
    }
    if(task && task.type === "task" && task.sectionId === activeTasks[0]){
        isActiveTaskSection = true;
    }

    return (
        <div style={style}>
           {task && task.title && <TaskItem isLastTask={isLastTask} index={indexValue} taskId={taskId} task={task} isActiveTaskSection={isActiveTaskSection} onTaskSelected={onTaskSelected} onAddNewtaskClicked={onAddNewtaskClicked} statusObj={statusObj} findMemberById={findMemberById} findLabelById={findLabelById} onQuickUpdateDate={onQuickUpdateDate} memberIdList={memberIdList} onQuickUpdateTaskMembers={onQuickUpdateTaskMembers}/>}
           {task && task.projectId && !task.title && <TaskItem isNew taskId={taskId} index={indexValue} task={task} onTaskItemBlurEvent={onTaskItemBlurEvent} onTaskItemFocusEvent={onTaskItemFocusEvent} onEnterNextNewTask={onEnterNextNewTask} statusObj={statusObj} findMemberById={findMemberById} findLabelById={findLabelById} onQuickUpdateDate={onQuickUpdateDate} memberIdList={memberIdList} onQuickUpdateTaskMembers={onQuickUpdateTaskMembers}></TaskItem>}
        </div>
    )
});





class VirtualList extends Component {
    // Constructor
    constructor(props){
      super(props);

    }


    /**
     * Will fetch the row height..
     * @param {*} index
     */
    getRowHeight({index}){
        //console.log("I am getting called");
      const {activeTasks, findTaskById, isAddNewTaskVisible, collapsedSectionList} = this.props;
        const taskId    = activeTasks[index];
        const task      = findTaskById(taskId);
        const isLastTask = isTaskLast(activeTasks, index, findTaskById);
        const isEmptySection = isSectionEmpty(activeTasks, index, findTaskById);
        if(task){
            if(task.type === "section"){
                let isCollapsed = isSectionCollapsed(collapsedSectionList, task.id);
                //console.log("Section Row Heights", isCollapsed);
                const firstSectionId = activeTasks[0];
                if(taskId === firstSectionId){
                    if(isEmptySection && isAddNewTaskVisible && !isCollapsed){
                        return 85.5
                    } else{
                        return 44.5;
                    }

                }else{
                    if(isEmptySection && isAddNewTaskVisible && isCollapsed){
                        return 100;
                    } else{
                        return 59;
                    }

                }
              } else if(task.type === "task"){
                  //console.log("Item type", task, isLastTask, isAddNewTaskVisible, task.title);
                  if(isLastTask && isAddNewTaskVisible && task.title){
                      return 82;
                  }
              }
        }

        return 41;
    }


    render() {
      const {
          activeTasks,
          setReference,
          findTaskById,
          onNewTaskAdded,
          onTaskSelected,
          onTaskItemBlurEvent,
          onTaskItemFocusEvent,
          onEnterNextNewTask,
          onSectionStateChanged,
          onAddNewtaskClicked,
          onSectionCollapsed,
          populateCollapsedSectionArray,
          statusObj,
          findMemberById,
          findLabelById,
          onQuickUpdateDate,
          memberIdList,
          onQuickUpdateTaskMembers,
          height,
          width,
        } = this.props;
      const rowRenderer = renderRow(activeTasks, findTaskById, onNewTaskAdded, onTaskSelected, onTaskItemBlurEvent, onTaskItemFocusEvent, onEnterNextNewTask, onSectionStateChanged, onAddNewtaskClicked, onSectionCollapsed, populateCollapsedSectionArray, statusObj, findMemberById, findLabelById, onQuickUpdateDate, memberIdList, onQuickUpdateTaskMembers);
      const totalRows = activeTasks.length;
      return (
        <List
        ref={(instance) => {
          ListRef = instance;
        }}
        rowHeight={this.getRowHeight.bind(this)}
        rowRenderer={rowRenderer}
        rowCount={totalRows}
        height={height}
        width={width}
        style={{
          overflowX: false,
          overflowY: false,
        }}
        />
      );
    }
}

/*
  * Important note:
  * To access the ref of a component that has been wrapped with the SortableContainer HOC,
  * you *must* pass in {withRef: true} as the second param. Refs are opt-in.
  */
const SortableList = SortableContainer(VirtualList, {withRef: true});



/**
 * https://github.com/clauderic/react-sortable-hoc/blob/master/examples/virtual-list.js
**/
class TaskList extends Component {


  handleScroll({ target }) {
    const { scrollTop, scrollLeft } = target;
    if (ListRef) {
      const { Grid: grid } = ListRef;
      grid.handleScrollEvent({ scrollTop, scrollLeft });
    }
  }

  onSortEnd(e){
    const {
      onItemPositionChanged,
    }  = this.props;

    if (e.oldIndex !== e.newIndex) {
      //console.log("Hoc Method getting called");
      onItemPositionChanged(e.oldIndex, e.newIndex);
      // We need to inform React Virtualized that the items have changed heights
      const instance = this.SortableList.getWrappedInstance();

      ListRef.recomputeRowHeights();
      instance.forceUpdate();
    }
  }



  onSortStart(e){
    const {onAddNewTaskVisible} = this.props;
    onAddNewTaskVisible(false);
    const instance = this.SortableList.getWrappedInstance();
    instance.List.recomputeRowHeights();
    instance.forceUpdate();
  }


  onSectionCollapsed(){
    const instance = this.SortableList.getWrappedInstance();
    instance.List.recomputeRowHeights();
    instance.forceUpdate();
  }

  getElement(id){
    return ()=>{
      const elem = document.getElementById(id);
      //First child is responsible for scrolling...
      return elem.firstChild;

    }
  }


  render() {
    const {
      activeTasks,
      findTaskById,
      findMemberById,
      findLabelById,
      onItemPositionChanged,
      onNewTaskAdded,
      onTaskSelected,
      onTaskItemBlurEvent,
      onTaskItemFocusEvent,
      onEnterNextNewTask,
      onSectionStateChanged,
      onAddNewtaskClicked,
      onAddNewTaskVisible,
      isAddNewTaskVisible,
      collapsedSectionList,
      populateCollapsedSectionArray,
      statusObj,
      onQuickUpdateDate,
      memberIdList,
      onQuickUpdateTaskMembers
    }  = this.props;

    const id = "snaphy-react-custom-scrollbar";

    return (
      <Scrollbars id={id} style={{ width: "100%", height: "100%" }}
          universal
          // This will activate auto hide
          autoHide
          onScroll={this.handleScroll.bind(this)}
          // Hide delay in ms
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}>
        <div className="task-list-block-scrollbar-container">
          <div  className="task-list-block-scrollbar-block">
            <AutoSizer  style={{ width: "inherit", height: "inherit" }}>
              {({ height, width }) => (
                <SortableList
                ref={(instance) => {
                    this.SortableList = instance;
                }}
                onSortEnd={this.onSortEnd.bind(this)}
                activeTasks={activeTasks}
                helperClass={'selected_item'}
                useDragHandle
                findTaskById={findTaskById}
                onItemPositionChanged={onItemPositionChanged}
                onNewTaskAdded={onNewTaskAdded}
                onTaskSelected={onTaskSelected}
                onTaskItemBlurEvent={onTaskItemBlurEvent}
                onTaskItemFocusEvent={onTaskItemFocusEvent}
                onEnterNextNewTask={onEnterNextNewTask}
                onSectionStateChanged={onSectionStateChanged}
                onAddNewtaskClicked={onAddNewtaskClicked}
                height={height}
                getContainer={this.getElement(id)}
                width={width}
                onSortStart={this.onSortStart.bind(this)}
                findMemberById={findMemberById}
                findLabelById={findLabelById}
                isAddNewTaskVisible={isAddNewTaskVisible}
                collapsedSectionList={collapsedSectionList}
                onSectionCollapsed={this.onSectionCollapsed.bind(this)}
                populateCollapsedSectionArray={populateCollapsedSectionArray}
                statusObj={statusObj}
                onQuickUpdateDate={onQuickUpdateDate}
                memberIdList={memberIdList}
                onQuickUpdateTaskMembers={onQuickUpdateTaskMembers}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </Scrollbars>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {

    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here

};




export default connect(mapStateToProps, mapActionsToProps)(TaskList);

