import React from 'react';
import { connect } from 'react-redux';


//Custom Import
import {  } from '../ModelData/ModelDataActions';
import ALL_DATA from '../../data/taskListData';
import TaskDetail from '../TaskDetail';


class AllTasks extends React.Component {


    componentWillMount() {

        //this.props.initializeDataAction(ALL_DATA);

    }

    render() {
        console.log(" I am getting called");
        return (
            <div style={{ backgroundColor: "#f6f8f9", width: '1170px', height: '737px' }}>
                <div style={{ width: '463px', float: 'right', backgroundColor: "#ffffff" }}>
                    <TaskDetail></TaskDetail>
                </div>
            </div>
        )
    }

}


function mapStateToProps(store) {
    return {
        // users : store.ModelDataReducer.users,
        // labels : store.ModelDataReducer.labels,
        // status : store.ModelDataReducer.status,
        // section : store.ModelDataReducer.section,
        // task : store.ModelDataReducer.task
    }
}


const mapActionsToProps = {
    initializeDataAction
}






export default connect(mapStateToProps, mapActionsToProps)(AllTasks);