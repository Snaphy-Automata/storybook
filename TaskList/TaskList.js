import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import {
    SortableContainer,
  } from 'react-sortable-hoc';

import './TaskList.css';

import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'


const TaskList = SortableContainer((props) => {

    const {
        sectionId,
        sectionList,
        taskList,
        memberObj,
        statusObj,
        labelObj
    } = props;

    const isSectionOpened = true;

    return (
        <div>
            <div style={{ background: "#fff", maxWidth: "800px", margin: "0 auto"}}>
                <TaskListHeading heading="Active Tasks" type="fixed"/>
                {taskList && taskList.length!==0 && <div>
                    {
                        map(taskList, function(task, index){

                            return(
                                <TaskItem index={index} key={index} task={task} isActiveTaskSection  memberObj={memberObj} statusObj={statusObj} labelObj ={labelObj}/>
                            )
                        })
                    }
                </div>}

            </div>
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

