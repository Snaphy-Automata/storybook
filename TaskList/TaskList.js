import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, WindowScroller } from 'react-virtualized';
import {
    sortableContainer,
    sortableElement,
    arrayMove,
    DragLayer
  } from './react-sortable-multiple-hoc'

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'


const dragLayer = new DragLayer()

const TaskList = (props => {

    const {
        allData,
        sectionId,
    } = props;

    console.log(allData);

    const renderRow = (sectionId) => {
        const tasks = allData.section.byId[sectionId].tasks;
        const rowRenderer =  ({
            index,       // Index of row
            isScrolling, // The List is currently being scrolled
            isVisible,   // This row is visible within the List (eg it is not an overscanned row)
            key,         // Unique key within array of rendered rows
            parent,      // Reference to the parent List (instance)
            style        // Style object to be applied to row (to position it);
                         // This must be passed through to the rendered row element.
          })  => {
            
            const task = tasks[index];
            // Style is required since it specifies how the row is to be sized and positioned.
            // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
            // By default, the List component provides following style properties:
            //    position
            //    left
            //    top
            //    height
            //    width
            // You can add additional class names or style properties as you would like.
            // Key is also required by React to more efficiently manage the array of rows.
            return (
                <div style={style} key={key}>
                    <TaskItem index={index} task={task} isActiveTaskSection  memberObj={allData.user.byId} statusObj={allData.status.byId} labelObj ={allData.label.byId}/>
                </div>
            )
        }

        return rowRenderer;
    }
    

    const isSectionOpened = true;

   
    return (
        <div>
            {
                map(allData.section.allIds, sectionId => {
                    const section = allData.section.byId[sectionId];
                    const taskRowRenderer = renderRow(sectionId);
                    return (
                        <div key={section.id} style={{ background: "#fff", maxWidth: "800px", margin: "0 auto"}}>
                            <TaskListHeading id={section.id} heading={section.title} protected={section.isProtected} type="fixed"/>
                            {
                                section.tasks && 
                                section.tasks.length!==0 && 
                                <WindowScroller>
                                    {({ height, isScrolling, registerChild, scrollTop }) => (
                                        <div ref={registerChild}>
                                            <List
                                                width={800}
                                                rowCount={section.tasks.length}
                                                rowHeight={41}
                                                rowRenderer={taskRowRenderer}
                                                autoHeight
                                                height={height}
                                                isScrolling={isScrolling}
                                                scrollTop={scrollTop}
                                            />
                                        </div>
                                    )}
                                </WindowScroller>
                            }
                        </div>
                    );
                })
            }
            
        </div>
    )
});

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




export default connect(mapStateToProps, mapActionsToProps)(TaskList);

