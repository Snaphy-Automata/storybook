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




const renderRow = (activeTasks, findTaskById, onNewTaskAdded, onTaskSelected, onTaskItemBlurEvent, onTaskItemFocusEvent, onEnterNextNewTask, onSectionStateChanged, onAddNewtaskClicked) => {

    const rowRenderer =  (props)  => {
        const {
            index,       // Index of row
            isScrolling, // The List is currently being scrolled
            isVisible,   // This row is visible within the List (eg it is not an overscanned row)
            key,         // Unique key within array of rendered rows
            parent,      // Reference to the parent List (instance)
            style        // Style object to be applied to row (to position it);
        } = props;
        const taskOrSectionId  = activeTasks[index];
        const taskOrSection    = findTaskById(taskOrSectionId);
        //Check whther this section is the first one..
        const isFirst    = activeTasks[0] === taskOrSectionId;
        const isLastTask = isTaskLast(activeTasks, index, findTaskById);


        return (
            <div style={style}  key={key}>
            {
                taskOrSection && taskOrSection.type === "section" &&
                <SortableHeading isFirst={isFirst} index={index} indexValue={index} section={taskOrSection} onNewTaskAdded={onNewTaskAdded} onSectionStateChanged={onSectionStateChanged}></SortableHeading>
            }
            {
                taskOrSection && taskOrSection.type === "task" &&
                <SortableTask isLastTask={isLastTask} index={index} indexValue={index} taskId={taskOrSectionId} task={taskOrSection} activeTasks={activeTasks} onTaskSelected={onTaskSelected} onTaskItemBlurEvent={onTaskItemBlurEvent} onTaskItemFocusEvent={onTaskItemFocusEvent} onEnterNextNewTask={onEnterNextNewTask} onAddNewtaskClicked={onAddNewtaskClicked}></SortableTask>
            }
            </div>
        )
    }
    return rowRenderer;
}


const SortableHeading = SortableElement((props)=>{
    //console.log("Sortable heading props", props);
    const {style, section, isFirst, onNewTaskAdded, indexValue, onSectionStateChanged} = props;

    return (
        <div style={{width:"100%"}}>
            {!isFirst && <div className="task-list-section-seperator"></div>}
            <div className="task-list-section-wrapper" style={{background: "#fff", ...style}}>
                <TaskListHeading index={indexValue} sectionId={section.id} id={section.id} heading={section.title} protected={section.isProtected} type="fixed" onNewTaskAdded={onNewTaskAdded} protectedName={section.protectedName} onSectionStateChanged={onSectionStateChanged}/>
            </div>
        </div>

    )
});



const SortableTask = SortableElement((props)=>{
    //console.log("Sortable task props", props);
    const {style, isLastTask, className, index, taskId, task, onTaskSelected, onTaskItemBlurEvent, onTaskItemFocusEvent, indexValue, onEnterNextNewTask, onAddNewtaskClicked} = props;
    let isActiveTaskSection = false;
    if(task && task.type === "section" && task.protectedName === "active_tasks"){
      isActiveTaskSection = true;
    }
    //console.log("Section Index value", indexValue);
    return (
        <div style={style} className={className}>
           {task && task.title && <TaskItem isLastTask={isLastTask} index={indexValue} taskId={taskId} task={task} isActiveTaskSection={isActiveTaskSection} onTaskSelected={onTaskSelected}/>}
           {task && task.projectId && !task.title && <TaskItem isNew taskId={taskId} index={indexValue} task={task} onTaskItemBlurEvent={onTaskItemBlurEvent} onTaskItemFocusEvent={onTaskItemFocusEvent} onEnterNextNewTask={onEnterNextNewTask}></TaskItem>}
           {task && !task.title &&  !task.projectId && <TaskItem isCreate taskId={taskId} index={indexValue} task={task} onAddNewtaskClicked={onAddNewtaskClicked}/>}
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
      const {activeTasks, findTaskById} = this.props;
        const taskId    = activeTasks[index];
        const task      = findTaskById(taskId);
        if(task){
            if(task.type === "section"){
                const firstSectionId = activeTasks[0];
                if(taskId === firstSectionId){
                    return 44.5;
                }else{
                    return 59;
                }
              }
        }

        return 41;
    }


    isRowLoaded ({ index }) {
        const allData = this.props.allData;
        return !!allData.task.allIds[index];
    }

    loadMoreRows ({ startIndex, stopIndex }) {
        const that = this;
        //FIXME: 9th Aug Robins
        // Change it with server call..
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                console.log("More data loaded", startIndex, stopIndex);
                that.isLoaded = true;
                resolve();
            }, 600)
        });
        // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
        //     .then(response => {
        //     // Store response data in list...
        //     })
    }


    render() {
      const {activeTasks, findTaskById, height, width, onNewTaskAdded, onTaskSelected, onTaskItemBlurEvent, onTaskItemFocusEvent, onEnterNextNewTask, onSectionStateChanged, onAddNewtaskClicked} = this.props;
      const rowRenderer = renderRow(activeTasks, findTaskById, onNewTaskAdded, onTaskSelected, onTaskItemBlurEvent, onTaskItemFocusEvent, onEnterNextNewTask, onSectionStateChanged, onAddNewtaskClicked);
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

    console.log("On Sort End ", e.oldIndex, e.newIndex,);
    if (e.oldIndex !== e.newIndex) {
      //console.log("Hoc Method getting called");
      onItemPositionChanged(e.oldIndex, e.newIndex);
      // We need to inform React Virtualized that the items have changed heights
      const instance = this.SortableList.getWrappedInstance();

      ListRef.recomputeRowHeights();
      instance.forceUpdate();
    }
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
      onItemPositionChanged,
      onNewTaskAdded,
      onTaskSelected,
      onTaskItemBlurEvent,
      onTaskItemFocusEvent,
      onEnterNextNewTask,
      onSectionStateChanged,
      onAddNewtaskClicked,
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

