import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, WindowScroller } from 'react-virtualized';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'

/**
 * Will return section if section is to be displayed..
 * @param {*} taskIndex 
 */
const displaySection = (taskId, allData) => {
    const task = allData.task.byId[taskId];
    const sectionId = task.sectionId;
    const sectionTasks = allData.section.byId[sectionId].tasks;
    const firstTask = sectionTasks[0];
    
    if(firstTask.id === task.id) {
        return allData.section.byId[sectionId];
    }else{
        return false;
    }
}

const renderRow = (allData) => {
    const tasks = allData.task.allIds;
    const rowRenderer =  ({
        index,       // Index of row
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        key,         // Unique key within array of rendered rows
        parent,      // Reference to the parent List (instance)
        style        // Style object to be applied to row (to position it);
                     // This must be passed through to the rendered row element.
      })  => {
        
        const taskId  = tasks[index];
        const task    = allData.task.byId[taskId];
        
        const section = displaySection(taskId, allData);
        return (
            <div>
            { 
                section &&
                <div>
                    {section.title}    
                </div>
            }
                <TaskItem style={style} key={index} index={index} task={task} isActiveTaskSection  memberObj={allData.user.byId} statusObj={allData.status.byId} labelObj ={allData.label.byId}/>
            </div>
          
        )
    }

    return rowRenderer;
}

class VirtualList extends Component {
    render() {
        const {
            allData,
            height,
            isScrolling,
            scrollTop,
        } = this.props;
        const taskRowRenderer = renderRow(allData);
        return (
            <List
                ref={(instance) => {
                    this.List = instance;
                }}
                rowHeight={41}
                rowRenderer={taskRowRenderer}
                rowCount={allData.task.allIds.length}
                width={800}
                autoHeight
                height={height}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
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



class SortableComponent extends Component {
    
    render() {
        const {
            allData,
        } = this.props;
        const that = this;
        const onSortEnd = ({oldIndex, newIndex}) => {
            console.log("On Sort End",oldIndex, newIndex);
            if (oldIndex !== newIndex) {
                this.setState({
                    items: arrayMove(section.tasks, oldIndex, newIndex),
                });
        
                // We need to inform React Virtualized that the items have changed heights
                const instance = that.SortableList.getWrappedInstance();
                instance.List.recomputeRowHeights();
                instance.forceUpdate();
            }
        };
        return (
            <div>       
                <WindowScroller>
                    {({ height, isScrolling, registerChild, scrollTop }) => (
                        <div ref={registerChild}>
                            <SortableList 
                                ref={(instance) => {
                                    this.SortableList = instance;
                                }}
                                allData={allData}
                                onSortEnd={onSortEnd}
                                height={height}
                                isScrolling={isScrolling}
                                scrollTop={scrollTop}
                                useDragHandle
                                useWindowAsScrollContainer
                            />
                        </div>  
                    )}
                </WindowScroller>
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(store) {
    const taskListReducer = store.AllTaskReducer;
    return {
        
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
};




export default connect(mapStateToProps, mapActionsToProps)(SortableComponent);

