import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, WindowScroller } from 'react-virtualized';
import './TaskList.css';

import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'

const TaskList = (props) => {

    const {
        sectionId,
        sectionList,
        taskList,
        memberObj,
        statusObj,
        labelObj
    } = props;

    function rowRenderer ({
        index,       // Index of row
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        key,         // Unique key within array of rendered rows
        parent,      // Reference to the parent List (instance)
        style        // Style object to be applied to row (to position it);
                     // This must be passed through to the rendered row element.
      }) {
        const task = taskList[index];

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
                <TaskItem index={index} task={task} isActiveTaskSection  memberObj={memberObj} statusObj={statusObj} labelObj ={labelObj}/>
            </div>
        )
    }

    const isSectionOpened = true;

   
    return (
        <div>
            <div style={{ background: "#fff", maxWidth: "800px", margin: "0 auto"}}>
                <TaskListHeading heading="Active Tasks" type="fixed"/>
                {
                    taskList && 
                    taskList.length!==0 && 
                    <WindowScroller>
                        {({ height, isScrolling, registerChild, scrollTop }) => (
                            <div ref={registerChild}>
                                <List
                                    width={800}
                                    rowCount={taskList.length}
                                    rowHeight={41}
                                    rowRenderer={rowRenderer}
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
        </div>
    )
};

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

