import React from 'react';
import {connect} from 'react-redux';


//Custom Import
import {initializeDataAction} from '../ModelData/ModelDataActions';
import ALL_DATA from '../../data/taskListData';
import TaskList from '../TaskList';


class AllTasks extends React.Component{


    componentWillMount(){
       
        this.props.initializeDataAction(ALL_DATA);
        
    }

    render(){
        console.log(" I am getting called");
        return(
            <div>
                <TaskList></TaskList>
            </div>
        )
    }

}


function mapStateToProps(store){
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