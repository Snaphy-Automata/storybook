import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import List from 'react-virtualized/dist/commonjs/List';
import 'react-virtualized/styles.css'; // only needs to be imported once
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {  reduxForm } from 'redux-form'

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading'
import TaskItem from '../TaskItem/TaskItem'
import CustomScrollbar from '../CustomScrollbar'

let ListRef = null

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
      } else{
          return true;
      }
  }
  return false;
}

const SortableHeading = SortableElement((props)=>{
  const {section, isFirst, onNewTaskAdded, indexValue, onSectionStateChanged, isEmptySection, onAddNewtaskClicked, onSectionCollapsed} = props;
  return (
    <div  style={{width:"100%"}}>
        {!isFirst && <div className="task-list-section-seperator"></div>}
        <div className="task-list-section-wrapper" style={{background: "#fff"}}>
            <TaskListHeading
            isEmptySection={isEmptySection}
            index={indexValue}
            sectionId={section.id}
            onNewTaskAdded={onNewTaskAdded}
            onSectionStateChanged={onSectionStateChanged}
            onAddNewtaskClicked={onAddNewtaskClicked}
            onSectionCollapsed={onSectionCollapsed}
            />
        </div>
    </div>

  )
});



const SortableTask = SortableElement((props)=>{
    const {
      style,
      activeTasks,
      isLastTask,
      task,
      taskId,
      onTaskSelected,
      onTaskItemBlurEvent,
      onTaskItemFocusEvent,
      indexValue,
      onEnterNextNewTask,
      onAddNewtaskClicked,
      findMemberById,
      findLabelById,
      onQuickUpdateDate,
      memberIdList,
      onQuickUpdateTaskMembers,
      isScrolling,
      findTaskById,
      onSectionCollapsed
    } = props;
    let isNew = false, sectionId, previousItemId, previousItemObj
    if(task){
      sectionId = task.sectionId
      if(task.isNew){
        isNew = true
      }
    }else{
      isNew = true
      previousItemId = activeTasks[indexValue - 1]
      previousItemObj = findTaskById(previousItemId)
      if(previousItemObj.type === "section"){
        sectionId = previousItemObj.id
      } else{
        sectionId = previousItemObj.sectionId
      }

    }


    return (
        <div style={style}>
           <TaskItem
            isLastTask={isLastTask}
            index={indexValue}
            taskId={taskId}
            onTaskSelected={onTaskSelected}
            onAddNewtaskClicked={onAddNewtaskClicked}
            findMemberById={findMemberById}
            findLabelById={findLabelById}
            onQuickUpdateDate={onQuickUpdateDate}
            memberIdList={memberIdList}
            onQuickUpdateTaskMembers={onQuickUpdateTaskMembers}
            activeSectionId={activeTasks[0]}
            isNew={isNew}
            onTaskItemBlurEvent={onTaskItemBlurEvent}
            onTaskItemFocusEvent={onTaskItemFocusEvent}
            onEnterNextNewTask={onEnterNextNewTask}
            isScrolling={isScrolling}
            sectionId ={sectionId}
            previousItemId={previousItemId}
            onSectionCollapsed={onSectionCollapsed}
            />
        </div>
    )
});





class VirtualList extends PureComponent {
    static propTypes = {
      activeTasks: PropTypes.array.isRequired,
      findTaskById: PropTypes.func.isRequired,
      onNewTaskAdded: PropTypes.func.isRequired,
      onTaskSelected: PropTypes.func.isRequired,
      onTaskItemBlurEvent: PropTypes.func.isRequired,
      onTaskItemFocusEvent: PropTypes.func.isRequired,
      onEnterNextNewTask: PropTypes.func.isRequired,
      onSectionStateChanged: PropTypes.func.isRequired,
      onAddNewtaskClicked: PropTypes.func.isRequired,
      findMemberById: PropTypes.func,
      findLabelById: PropTypes.func,
      onQuickUpdateDate: PropTypes.func,
      memberIdList: PropTypes.array,
      onQuickUpdateTaskMembers: PropTypes.func,
      height:PropTypes.number,
      width: PropTypes.number,
    }

    static defaultProps = {

    }

    // Constructor
    constructor(props){
      super(props);
      this.getRowHeight    = this._getRowHeight.bind(this)
      this.rowRenderer     = this._rowRenderer.bind(this)
      this.onRowsRendered  = this._onRowsRendered.bind(this)
      this.startIndex      = 0
    }


    _rowRenderer(props){
      const {
        activeTasks,
        findTaskById,
        onNewTaskAdded,
        onTaskSelected,
        onTaskItemBlurEvent,
        onTaskItemFocusEvent,
        onEnterNextNewTask,
        onSectionStateChanged,
        onAddNewtaskClicked,
        findMemberById,
        findLabelById,
        onQuickUpdateDate,
        memberIdList,
        onQuickUpdateTaskMembers,
        onSectionCollapsed,
      } = this.props
      const {
          index,       // Index of row
          isScrolling, // The List is currently being scrolled
          isVisible,   // This row is visible within the List (eg it is not an overscanned row)
          key,         // Unique key within array of rendered rows
          parent,      // Reference to the parent List (instance)
          style,       // Style object to be applied to row (to position it);
      } = props;
      const taskOrSectionId  = activeTasks[index];
      const taskOrSection    = findTaskById(taskOrSectionId);
      //Check whther this section is the first one..
      const isFirst    = activeTasks[0] === taskOrSectionId;
      const isLastTask = isTaskLast(activeTasks, index, findTaskById);
      const isEmptySection = isSectionEmpty(activeTasks, index, findTaskById);

      let itemType;
      if(taskOrSection){
        if(taskOrSection.type === "section"){
          itemType = "section"
        } else if(taskOrSection.type === "task"){
          itemType = "task"
        }
      } else{
        itemType = "task"
      }

      const height = taskOrSection && taskOrSection.height?taskOrSection.height :"41px"

      return (
          <div style={{...style, height }}  key={key}>
          {
              taskOrSection && itemType === "section" &&
              <SortableHeading
              isEmptySection={isEmptySection}
              isFirst={isFirst}
              index={index}
              indexValue={index}
              section={taskOrSection}
              onNewTaskAdded={onNewTaskAdded}
              onSectionStateChanged={onSectionStateChanged}
              onSectionCollapsed={onSectionCollapsed}
              onAddNewtaskClicked={onAddNewtaskClicked}/>
          }
          {
              itemType === "task" &&
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
              findMemberById={findMemberById}
              findLabelById={findLabelById}
              onQuickUpdateDate={onQuickUpdateDate}
              memberIdList={memberIdList}
              isScrolling={isScrolling}
              onQuickUpdateTaskMembers={onQuickUpdateTaskMembers}
              findTaskById={findTaskById}
              onSectionCollapsed={onSectionCollapsed}
              ></SortableTask>
          }
          </div>
      )
    }


    _onRowsRendered(props){
      const { overscanStartIndex, overscanStopIndex, startIndex, stopIndex } = props
      //console.timeEnd("Testing_Scroll_TimeLag")
      const {getGridViewScrollRef} = this.props;
      const gridListRef = getGridViewScrollRef();
      //console.log("Grid view reference inside task list", startIndex, this.startIndex)
      if(gridListRef ){
        let scrollToIndex = startIndex
        // if((overscanStartIndex+1) === startIndex && this.startIndex === startIndex){
        //   scrollToIndex = startIndex + 1
        // }

        //console.log("Scroll Getting called", scrollToIndex)
        if(scrollToIndex !== this.startIndex){
          const scrollTop = ((scrollToIndex)*25) + 38
          //window.requestAnimationFrame(()=>{
            gridListRef.scrollTop(scrollTop)
            this.startIndex = scrollToIndex
          //})
        }

      }
    }


    /**
     * Will fetch the row height..
     * @param {*} index
     */
    _getRowHeight({index}){
        const {activeTasks, findTaskById} = this.props;
        const taskId    = activeTasks[index];
        const task      = findTaskById(taskId);
        if(task){
          //console.log(`Task: ${task.title}$$ Task Type: ${task.type}$$ Task Height: ${task.height}`);
          return task.height
        }
        return 41;
    }


    render() {
      const {
        activeTasks,
        height,
        width,
      } = this.props;
      const totalRows = activeTasks.length;

      //console.log("List getting redendered..", activeTasks);

      return (
        <List
          ref={(instance) => {
            ListRef = instance;
          }}
          rowHeight={this.getRowHeight}
          rowRenderer={this.rowRenderer}
          onRowsRendered={this.onRowsRendered}
          rowCount={totalRows}
          height={height}
          width={width}
          style={{
            height: "100%",
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
class TaskList extends PureComponent {

  static defaultProps = {

  }

  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }


  constructor(props){
    super(props)
    this.handleScroll       = this.handleScrollRaw.bind(this)
    this.onSortEnd          = this.onSortEndRaw.bind(this)
    this.onSortStart        = this.onSortStartRaw.bind(this)
    this.onSectionCollapsed = this.onSectionCollapsedRaw.bind(this)
  }

  handleScrollRaw(event) {
    const { target } = event
    const { scrollTop, scrollLeft } = target;
    if (ListRef) {
      const { Grid: grid } = ListRef;
      grid.handleScrollEvent({ scrollTop, scrollLeft })
    }
    //console.time("Testing_Scroll_TimeLag")
  }


  onSortEndRaw(e){
    const {
      onItemPositionChanged,
    }  = this.props;
    if (e.oldIndex !== e.newIndex) {
      onItemPositionChanged(e.oldIndex, e.newIndex);
      if(this.SortableList){
        // We need to inform React Virtualized that the items have changed heights
        const instance = this.SortableList.getWrappedInstance();
        setTimeout(()=>{
          ListRef.recomputeRowHeights();
          instance.forceUpdate();
        })
      }
    }
  }


  onSortStartRaw(e){
    if(this.SortableList){
      const instance = this.SortableList.getWrappedInstance();
      setTimeout(()=>{
         //ListRef.recomputeRowHeights();
         instance.forceUpdate();
      })
    }

  }


  onSectionCollapsedRaw(){
    //console.log("Recomputing Heights getting called");
    const instance = this.SortableList.getWrappedInstance();
    setTimeout(()=>{
      ListRef.recomputeRowHeights();
      instance.forceUpdate();
    })
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
      //FIXME: Remvoe 21st Sept.
      findMemberById,
      //FIXME: Remove 21st Sept.
      findLabelById,
      onItemPositionChanged,
      onNewTaskAdded,
      onTaskSelected,
      onTaskItemBlurEvent,
      onTaskItemFocusEvent,
      onEnterNextNewTask,
      onSectionStateChanged,
      onAddNewtaskClicked,
      collapsedSectionList,
      onQuickUpdateDate,
      memberIdList,
      onQuickUpdateTaskMembers,
      collapsedEmptySectionId,
      height,
      width,
      setScrollRef,
      getGridViewScrollRef,
    }  = this.props;


    const id = "snaphy-react-custom-scrollbar";

    //console.log("Task List getting reloaded")


    return (

        <CustomScrollbar setScrollRef={setScrollRef} id={id} onScroll={this.handleScroll}>
          <div style={{height: "auto"}} className="task-list-block-scrollbar-container">
            <div style={{height: "auto"}} className="task-list-block-scrollbar-block noselect">
              <SortableList
              ref={(instance) => {
                  this.SortableList = instance;
              }}
              onSortEnd={this.onSortEnd}
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
              onSortStart={this.onSortStart}
              findMemberById={findMemberById}
              findLabelById={findLabelById}
              collapsedSectionList={collapsedSectionList}
              onSectionCollapsed={this.onSectionCollapsed}
              onQuickUpdateDate={onQuickUpdateDate}
              memberIdList={memberIdList}
              getGridViewScrollRef={getGridViewScrollRef}
              onQuickUpdateTaskMembers={onQuickUpdateTaskMembers}
            />
          </div>
        </div>
      </CustomScrollbar>
    );
  }
}


export default TaskList;

