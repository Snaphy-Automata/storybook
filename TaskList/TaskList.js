import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, WindowScroller } from 'react-virtualized';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'

/**
 * Will display section based on the data..
 */
const displaySection = (taskId, allData) => {
    const task = allData.task.byId[taskId];
    const sectionId = task.sectionId;
    const section = allData.section.byId[sectionId];
    const sectionFirstTaskId = section.tasks[0].id;
    if(sectionFirstTaskId === taskId){
        return section;
    }else{
        return false;
    }

};



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
        const taskId  = tasks[index];
        const task    = allData.task.byId[taskId];
        const section = displaySection(taskId, allData);
        return (
            <div style={style}  key={key}>
            { 
                section &&
                <div key={section.id} style={{ background: "#fff",  margin: "0 auto"}}>
                    <TaskListHeading sectionId={section.id} id={section.id} heading={section.title} protected={section.isProtected} type="fixed"/> 
                </div>
            }
                <TaskItem index={index} taskId={taskId} task={task} isActiveTaskSection  memberObj={allData.user.byId} statusObj={allData.status.byId} labelObj ={allData.label.byId}/>
            </div>
          
        )
    }

    return rowRenderer;
}





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
        if(displaySection(taskId, allData)){
            return 105
        }

        return 41;
    }

    render() {
      const {allData} = this.props;
      const rowRenderer = renderRow(allData);
      return (
        <List
          ref={(instance) => {
            this.List = instance;
          }}
          rowHeight={this.getRowHeight.bind(this)}
          rowRenderer={rowRenderer}
          rowCount={allData.task.allIds.length}
          width={800}
          height={600}
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
  
        return (
            <SortableList 
                ref={(instance) => {
                    this.SortableList = instance;
                }}
                onSortEnd={this.onSortEnd}
                allData={allData}
                helperClass={'selected'}
                useWindowAsScrollContainer
                useDragHandle
            />
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

