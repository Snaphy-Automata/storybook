import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo'
import {DayPicker} from 'react-day-picker'


import { onOpenChangeDateDialogAction, onDatePickerOpenedAction } from '../TaskList/TaskListActions'

import { updateTaskDueDateAction } from '../../baseComponents/GridView/components/ModelData/Task/action'

import {compareDate} from '../../baseComponents/GridView/components/formatDate'

//import components..
import PopupField from '../PopupField'
import TeamCircleIcon from '../TeamCircleIcon'
import ChangeDateDialog from '../ChangeDateDialog'

//import mutation..
import {updateEndDateMutation} from '../../baseComponents/GridView/components/graphql/task/mutation'



class TaskDate extends PureComponent {

    static propTypes = {
        //props
        taskId: PropTypes.string.isRequired,

        //action
        onOpenChangeDateDialogAction: PropTypes.func,
        onDatePickerOpenedAction: PropTypes.func,
        updateTaskDueDateAction: PropTypes.func,

        //redux
        isDateDialogOpened: PropTypes.bool,
        isDatePickerOpened: PropTypes.bool,
        endDateMs: PropTypes.number

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props)
        this.onDateDialogStateChange = this._onDateDialogStateChange.bind(this)
        this.onDatePickerDialogStateChange = this._onDatePickerDialogStateChange.bind(this)
        this.onCloseDateDialog = this._onCloseDateDialog.bind(this)
        this.onOpenDateDialog = this._onOpenDateDialog.bind(this)
        this.onUpdateDueDate = this._onUpdateDueDate.bind(this)
        this.onDatePickerDateChanged = this._onDatePickerDateChanged.bind(this)
        this.onOpenDatePickerDialog = this._onOpenDatePickerDialog.bind(this)
        this.onCloseDatePickerDialog = this._onCloseDatePickerDialog.bind(this)
    }


    _onCloseDateDialog = () => {
        const { taskId, onOpenChangeDateDialogAction } = this.props
        onOpenChangeDateDialogAction(false, taskId)

    }


    _onOpenDateDialog = (e) => {
        const { taskId, onOpenChangeDateDialogAction } = this.props
        onOpenChangeDateDialogAction(true, taskId)
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    _onDateDialogStateChange = (stateValue) => {
        const { taskId, onOpenChangeDateDialogAction } = this.props
        onOpenChangeDateDialogAction(stateValue, taskId)
    }

    _onUpdateDueDate = (endDate) => {
        const { taskId, updateTaskDueDateAction, updateEndDateMutation } = this.props
        if (endDate) {
            //console.log("Update Due Date action getting called", endDate)
            updateTaskDueDateAction(taskId, endDate, updateEndDateMutation)
        }
    }

    _onDatePickerDateChanged = (day) => {
        console.log("Date Picker Date", day)
        const { taskId, updateTaskDueDateAction, updateEndDateMutation } = this.props
        if (day) {
            updateTaskDueDateAction(taskId, day, updateEndDateMutation)
        }
    }

    _onDatePickerDialogStateChange = (stateValue) => {
        const { taskId, onDatePickerOpenedAction } = this.props
        onDatePickerOpenedAction(stateValue, taskId)

    }

    _onOpenDatePickerDialog = (e) => {
        const { taskId, onDatePickerOpenedAction } = this.props
        onDatePickerOpenedAction(true, taskId)
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    _onCloseDatePickerDialog = (e) => {
        const { taskId, onDatePickerOpenedAction } = this.props
        onDatePickerOpenedAction(false, taskId)
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }




    render() {
        //console.log("Task date getting rendered")

        const { isDateDialogOpened, isDatePickerOpened, endDateMs, isCompleted, taskId, endTaskDate} = this.props
        let endDate
        //console.log("End Date Ms", endDateMs)
        if (endDateMs && endTaskDate) {
            endDate = compareDate(new Date(), new Date(endDateMs))
            if (isCompleted) {
                endDate = {
                    ...endDate,
                    colorCode: "#1ed0c1"
                }
            }
        }

        //console.log("Task Date End Ms", endDateMs)


        return (
            <div className="task-list-item-date-container">
                {
                    !endDate &&
                    <div>
                        <div style={{ position: "relative", top: "2px" }}>
                            <PopupField
                                triggerComponent={<TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" onClick={this.onOpenDatePickerDialog}></TeamCircleIcon>}
                                contentComponent={<DayPicker className="date-picker-container" onDayClick={this.onDatePickerDateChanged} />}
                                position="bottom center"
                                style={{ width: "242px", padding: "0" }}
                                basic={false}
                                isDialogOpened={isDatePickerOpened}
                                onDialogStateChange={this.onDatePickerDialogStateChange}
                            />
                        </div>
                    </div>
                }
                {
                    endDate &&
                    <div style={{ color: endDate.colorCode }}>
                        <PopupField
                            triggerComponent={<div className="task-list-item-date-item" style={{ color: endDate.colorCode }} onClick={this.onOpenDateDialog}>{endDate.title}</div>}
                            contentComponent={<ChangeDateDialog taskId={taskId} endDate={endDate} onUpdateDueDate={this.onUpdateDueDate} onCloseDateDialog={this.onCloseDateDialog} />}
                            position="bottom left"
                            style={{ width: "157px", height: "120px", padding: "0" }}
                            isDialogOpened={isDateDialogOpened}
                            basic={false}
                            onDialogStateChange={this.onDateDialogStateChange}
                        />


                        {/* {!isDateDialogOpened && <Popup trigger={<div style={{ display: "inline" }}>{!isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }} onClick={openSelectDateDialog}>{formattedDueDateObj.date}</div>}</div>}
                                                content="Change Due Date"
                                                position='bottom center'
                                                inverted
                                                style={{ fontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity: "0.8" }}
                                                size='mini'>

                                            </Popup>}
                                            <Popup trigger={
                                                <div style={{ display: "inline" }}>
                                                    {isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }} onClick={openSelectDateDialog}>{formattedDueDateObj.date}</div>}
                                                </div>
                                            }
                                                content={<ChangeDateDialog isTodaySelected={props.isTodaySelected} isTomorrowSelected={props.isTomorrowSelected} isNextWeekSelected={props.isNextWeekSelected} onSelectDateAction={onSelectDateAction} task={task} dateData={formattedDueDateObj.date} isDateDialogOpened={isDateDialogOpened} onCloseDateDialog={onCloseDateDialog} />}
                                                position='bottom center'
                                                on='click'
                                                open={isDateDialogOpened}
                                                onClose={onCloseDateDialog}
                                                style={{ padding: "0", width: "157px", height: "120px" }}
                                                size='mini'>

                                            </Popup> */}


                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(store, props) {
    const dateDialog = store.TaskListReducer.dateDialog
    const datePickerDialog = store.TaskListReducer.datePickerDialog
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
    const endTaskDate = task.endDate
    const isCompleted = task.isCompleted
    return {
        isDateDialogOpened,
        isDatePickerOpened,
        endDateMs,
        endTaskDate,
        isCompleted
    }
}

const mapActionsToProps = {
    //Task List actions..
    onOpenChangeDateDialogAction,
    onDatePickerOpenedAction,
    //Model Data Actions..
    updateTaskDueDateAction

}

const TaskDateMutation = compose(
    graphql(updateEndDateMutation, { name: "updateEndDateMutation" }),
)(TaskDate)


export default connect(mapStateToProps, mapActionsToProps)(TaskDateMutation)