import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class TaskDate extends PureComponent {

    static propTypes = {
        //props
        taskId : PropTypes.string.isRequired

        //action

        //redux
    }

    static defaultProps = {

    }

    constructor(props){
        super(props)
    }

    render(){
        return {

        }
    }
}

function mapStateToProps(store, props){
    const dateDialog           = store.TaskListReducer.dateDialog
    const datePickerDialog     = store.TaskListReducer.datePickerDialog
    let isDateDialogOpened = false, isDatePickerOpened = false;
    if (dateDialog && dateDialog.taskId === props.taskId) {
        isDateDialogOpened = true;
    }
    if (datePickerDialog && datePickerDialog.taskId === props.taskId) {
        isDatePickerOpened = true;
    }
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    const endDateMs = task.endDateMs
    return {
        isDateDialogOpened,
        isDatePickerOpened,
        endDateMs
    }
}

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(TaskDate)