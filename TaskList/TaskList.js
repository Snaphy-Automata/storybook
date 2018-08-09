import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, ArrowKeyStepper , WindowScroller, AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import {SortableContainer, arrayMove, SortableElement} from 'react-sortable-hoc';

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'



const renderRow = (allData) => {
    const tasks = allData.task.allIds;
    
    const rowRenderer =  (props)  => {
        const {
            index,       // Index of row
            isScrolling, // The List is currently being scrolled
            isVisible,   // This row is visible within the List (eg it is not an overscanned row)
            key,         // Unique key within array of rendered rows
            parent,      // Reference to the parent List (instance)
            style        // Style object to be applied to row (to position it);
        } = props;
        const taskOrSectionId  = tasks[index];
        const taskOrSection    = allData.task.byId[taskOrSectionId];

      
        return (
            <div style={style}  key={key}>
            { 
                taskOrSection && taskOrSection.type === "section" && 
                <SortableHeading index={index} section={taskOrSection}></SortableHeading>
            }
            {
                taskOrSection && taskOrSection.type === "task" && 
                <SortableTask index={index} taskId={taskOrSectionId} task={taskOrSection} allData={allData} ></SortableTask>
            }
            </div>
        )
    }
    return rowRenderer;
}


const SortableHeading = SortableElement((props)=>{
    const {style, section} = props;
    return (
        <div style={{background: "#fff", ...style}}>
            <TaskListHeading sectionId={section.id} id={section.id} heading={section.title} protected={section.isProtected} type="fixed"/> 
        </div>
    )
});



const SortableTask = SortableElement((props)=>{
    
    const {style, className, index, taskId, task, allData} = props;
    return (
        <div style={style} className={className}>
            <TaskItem index={index} taskId={taskId} task={task} isActiveTaskSection  memberObj={allData.user.byId} statusObj={allData.status.byId} labelObj ={allData.label.byId}/>
        </div>
    )
});





class VirtualList extends Component {
    /**
     * Will fetch the row height..
     * @param {*} index 
     */
    getRowHeight({index}){
        const {allData} = this.props;
        const tasks     = allData.task.allIds;
        const taskId    = tasks[index];
        const task      = allData.task.byId[taskId];
        if(task.type === "section"){
            return 65
        }
        return 41;
    }


    render() {
      const {allData} = this.props;
      const rowRenderer = renderRow(allData);
      const totalRows = allData.task.allIds.length;
      return (
        // <AutoSizer>  
        //     {({ height, width }) => (
                // <WindowScroller>
                // {({ height, isScrolling, onChildScroll, scrollTop, registerChild }) => (
                    // <ArrowKeyStepper rowCount={allData.task.allIds.length} columnCount={1} className="task-list-item-selected">
                    // {({ onSectionRendered, scrollToRow }) => (
                     
                            <List
                            ref={(instance) => {
                                this.List = instance;
                            }}
                            rowHeight={this.getRowHeight.bind(this)}
                            rowRenderer={rowRenderer}
                            rowCount={totalRows}
                            //onSectionRendered={onSectionRendered}
                            //scrollToRow={scrollToRow}
                            width={800}
                            height={300}
                            // isScrolling={isScrolling}
                            // onChildScroll={onChildScroll}
                            // scrollTop={scrollTop}
                            />
                     
                    // )}
                    // </ArrowKeyStepper>
                // )}
                // </WindowScroller>
        //     )}
        // </AutoSizer>    
        
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
          allData
        }  = this.props;
        console.log("All Data", allData);
        return (
            <div style={{height:"300px", width:"800px", margin: "0 auto"}}>
                <SortableList 
                    ref={(instance) => {
                        this.SortableList = instance;
                    }}
                    onSortEnd={this.onSortEnd}
                    allData={allData}
                    helperClass={'selected'}
                    //useWindowAsScrollContainer
                    useDragHandle
                />
            </div>
            
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        sectionObj: store.ModelDataReducer.section,
        userObj: store.ModelDataReducer.users,
        labelObj: store.ModelDataReducer.labels,
        statusObj: store.ModelDataReducer.statusObj,
        cursor: store.ModelDataReducer.cursor

    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    
};




export default connect(mapStateToProps, mapActionsToProps)(TaskList);

