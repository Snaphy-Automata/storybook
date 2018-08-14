import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, InfiniteLoader, AutoSizer, WindowScroller} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import Promise from 'bluebird';
import {SortableContainer, arrayMove, SortableElement} from 'react-sortable-hoc';

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'


const isTaskLast = (activeTasks, index, findTaskById) => {
    const nextTaskIndex = index + 1;
    if(index === 0 && activeTasks.length === 1){
        return true
    }else if(index+1 === activeTasks.length){
        return true
    }else{
        const nextTaskId = activeTasks[nextTaskIndex];
        const nextTask = findTaskById(nextTaskId);
        return nextTask.type === "section";
    }
};




const renderRow = (activeTasks, findTaskById) => {

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
                <SortableHeading isFirst={isFirst}  index={index} section={taskOrSection}></SortableHeading>
            }
            {
                taskOrSection && taskOrSection.type === "task" &&
                <SortableTask isLastTask={isLastTask} index={index} taskId={taskOrSectionId} task={taskOrSection} activeTasks={activeTasks} ></SortableTask>
            }
            </div>
        )
    }
    return rowRenderer;
}


const SortableHeading = SortableElement((props)=>{
    const {style, section, isFirst} = props;
    return (
        <div style={{width:"100%"}}>
            {!isFirst && <div className="task-list-section-seperator"></div>}
            <div className="task-list-section-wrapper" style={{background: "#fff", ...style}}>
                <TaskListHeading sectionId={section.id} id={section.id} heading={section.title} protected={section.isProtected} type="fixed"/>
            </div>
        </div>

    )
});



const SortableTask = SortableElement((props)=>{
    const {style, isLastTask, className, index, taskId, task} = props;
    let isActiveTaskSection = false;
    if(task && task.type === "section" && task.protectedName === "active_tasks"){
      isActiveTaskSection = true;
    }
    return (
        <div style={style} className={className}>
            <TaskItem isLastTask={isLastTask} index={index} taskId={taskId} task={task} isActiveTaskSection={isActiveTaskSection} />
        </div>
    )
});





class VirtualList extends Component {
    /**
     * Will fetch the row height..
     * @param {*} index
     */
    getRowHeight({index}){
      const {activeTasks, findTaskById} = this.props;
        const taskId    = activeTasks[index];
        const task      = findTaskById(taskId);
        if(task.type === "section"){
          const firstSectionId = activeTasks[0];
          if(taskId === firstSectionId){
              return 44.5;
          }else{
              return 59;
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
      const {activeTasks, setReference, findTaskById} = this.props;
      const rowRenderer = renderRow(activeTasks, findTaskById);
      const totalRows = activeTasks.length;
      return (
        <AutoSizer  style={{height: "inherit", width: "inherit"}}>
           {({ height, width }) => (
                    // <WindowScroller>
                    //   {({ height:windowHeight, isScrolling, onChildScroll, scrollTop, registerChild }) => (
                    // <ArrowKeyStepper rowCount={allData.task.allIds.length} columnCount={1} className="task-list-item-selected">
                    // {({ onSectionRendered, scrollToRow }) => (
                    // <InfiniteLoader
                    // isRowLoaded={this.isRowLoaded.bind(this)}
                    // loadMoreRows={this.loadMoreRows.bind(this)}
                    // rowCount={totalRows}
                    // >
                    //     {({ onRowsRendered, registerChild }) => (
                            // <div ref={registerChild}>
                                <List
                                ref={(instance) => {
                                    this.List = instance;
                                    setReference(instance);
                                }}
                                rowHeight={this.getRowHeight.bind(this)}
                                rowRenderer={rowRenderer}
                                rowCount={totalRows}
                                height={height}
                                width={width}
                                style={{
                                  height: "auto"
                                }}
                                />
                            //</div>
                    //     )}
                    // </InfiniteLoader>

                     //)}
                    //</ArrowKeyStepper>
                // )}
                // </WindowScroller>
          )}
        </AutoSizer>
      );
    }
  }

  /*
   * Important note:
   * To access the ref of a component that has been wrapped with the SortableContainer HOC,
   * you *must* pass in {withRef: true} as the second param. Refs are opt-in.
   */
  const SortableList = SortableContainer(VirtualList, {withRef: true});



  /*
 * https://github.com/clauderic/react-sortable-hoc/blob/master/examples/virtual-list.js
 */
class TaskList extends Component {

    onSortEnd({oldIndex, newIndex}){
        console.log("On Sort End ", oldIndex, newIndex);
        //   if (oldIndex !== newIndex) {
        //     const {items} = this.state;

        //     this.setState({
        //       items: arrayMove(items, oldIndex, newIndex),
        //     });

        //     // We need to inform React Virtualized that the items have changed heights
        //     const instance = this.SortableList.getWrappedInstance();

        //     instance.List.recomputeRowHeights();
        //     instance.forceUpdate();
        //   }
    };

    render() {
        const {
          activeTasks,
          setReference,
          findTaskById,
        }  = this.props;

        //console.log("All Tasks", activeTasks, findTaskById);
        return (
          <SortableList
              ref={(instance) => {
                  this.SortableList = instance;
              }}
              setReference={setReference}
              onSortEnd={this.onSortEnd}
              activeTasks={activeTasks}
              helperClass={'selected_item'}
              useDragHandle
              findTaskById={findTaskById}
          />
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

