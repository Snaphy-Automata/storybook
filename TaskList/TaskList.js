import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import List from 'react-virtualized/dist/commonjs/List';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
//Usefull for react-custom-scrollbar in performing animation..
//https://github.com/malte-wessel/react-custom-scrollbars/blob/master/examples/simple/components/SpringScrollbars/SpringScrollbars.js
import { SpringSystem, MathUtil } from 'rebound';
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
      onTaskSelectedAction: PropTypes.func.isRequired,
      onTaskItemBlurEvent: PropTypes.func.isRequired,
      onTaskItemFocusEvent: PropTypes.func.isRequired,
      onEnterNextNewTask: PropTypes.func.isRequired,
      onSectionStateChanged: PropTypes.func.isRequired,
      onAddNewtaskClicked: PropTypes.func.isRequired,
      findMemberById: PropTypes.func,
      findLabelById: PropTypes.func,
      onQuickUpdateDate: PropTypes.func,
      getGridViewScrollRef: PropTypes.func,
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
      this.getRowHeight       = this._getRowHeight.bind(this)
      this.rowRenderer        = this._rowRenderer.bind(this)
      this.onRowsRendered     = this._onRowsRendered.bind(this)
      this.startIndex         = 0
      this.onTaskSelected     = this._onTaskSelected.bind(this)
      this.handleSpringUpdate = this.handleSpringUpdate.bind(this)
    }


    componentDidMount() {
      this.springSystem = new SpringSystem();
      this.spring = this.springSystem.createSpring();
      this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
    }

    componentWillUnmount() {
        this.springSystem.deregisterSpring(this.spring);
        this.springSystem.removeAllListeners();
        this.springSystem = undefined;
        this.spring.destroy();
        this.spring = undefined;
    }

    getScrollTop() {
      const {getGridViewScrollRef} = this.props
      const gridListRef            = getGridViewScrollRef()
      if(gridListRef){
        return gridListRef.getScrollTop()
      }
    }

    getScrollHeight() {
      const {getGridViewScrollRef} = this.props
      const gridListRef            = getGridViewScrollRef()
      if(gridListRef){
        return gridListRef.getScrollHeight()
      }
    }

    getHeight() {
      const {getGridViewScrollRef} = this.props
      const gridListRef            = getGridViewScrollRef()
      if(gridListRef){
        return gridListRef.getHeight();
      }
    }

    scrollTop(top) {
      const {getGridViewScrollRef} = this.props
      const gridListRef            = getGridViewScrollRef()
      if(gridListRef){
        const scrollTop            = gridListRef.getScrollTop()
        const scrollHeight         = gridListRef.getScrollHeight()
        const val = MathUtil.mapValueInRange(top, 0, scrollHeight, scrollHeight * 0.2, scrollHeight * 0.8);
        console.log(`Scrolling with calculated value:${val}, prev Scroll Height:${scrollHeight}, Prev Scroll Top: ${scrollTop}`)
        this.spring.setCurrentValue(scrollTop).setAtRest()
        this.spring.setEndValue(val)
      }
    }

    handleSpringUpdate(spring) {
      const {getGridViewScrollRef} = this.props
      const gridListRef            = getGridViewScrollRef()
      if(gridListRef){
        const val = spring.getCurrentValue();
        gridListRef.scrollTop(val);
      }
    }



    _rowRenderer(props){
      const {
        activeTasks,
        findTaskById,
        onNewTaskAdded,
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
              onTaskSelected={this.onTaskSelected}
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
      console.log("Grid view reference inside task list", props, this.startIndex)
      let scrollToIndex = startIndex
      console.log("Scroll Getting called", scrollToIndex)
      if(scrollToIndex !== this.startIndex){
        const top = ((scrollToIndex)*25) + 38
        this.scrollTop(top)
        this.startIndex = scrollToIndex
      }
    }


    _onTaskSelected(taskId, index){
      const {onTaskSelectedAction} = this.props
      onTaskSelectedAction(taskId);
      const actualIndex = index <= 4?index: index - 3
      if(index > 3){
        const top = ((actualIndex)*25)
        this.scrollTop(top)
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
      onTaskSelectedAction,
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
              onTaskSelectedAction={onTaskSelectedAction}
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

