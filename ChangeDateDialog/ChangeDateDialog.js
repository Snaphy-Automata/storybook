import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

//Custom Import
import './ChangeDateDialog.css'
import CustomCheckbox from '../CustomCheckbox';

//import {onSelectDateAction} from '../TaskList/TaskListActions';



class ChangeDateDialog extends React.Component{

    componentDidMount(){
        //console.log("I am getting called", this.props.dateData);
        // if(this.props.dateData){
        //     console.log("I am getting called", this.props.dateData);
        //     if(this.props.dateData === "today"){
        //         this.props.onSelectDateAction(this.props.task.id, true, false, false);
        //     } else if(this.props.dateDate === "tomorrow"){
        //         console.log("Tomorrow getting called");
        //         this.props.onSelectDateAction(this.props.task.id, false, true, false);
        //     } else if(this.props.dateDate === moment().add(1, 'weeks').startOf('isoWeek').format("DD MMM")){
        //         this.props.onSelectDateAction(this.props.task.id, false, false, true);
        //     }
        // }
    }

    render(){
       // console.log("Change Date Dialog Props", this.props);
        const nextWeek = moment().add(1, 'weeks').startOf('isoWeek').format("DD MMM");

        const onTodaySelected = () => {
            //console.log("Today Selected getting called");
            this.props.onSelectDateAction(this.props.task.id, true, false, false);
            this.props.onCloseDateDialog();
        }

        const onTomorrowSelected = () => {
            //console.log("Tomorrow Selected getting called");
            this.props.onSelectDateAction(this.props.task.id, false, true, false);
            this.props.onCloseDateDialog();
        }

        const onNextWeekSelected = () => {
            //console.log("Next Week Selected getting called");
            this.props.onSelectDateAction(this.props.task.id, false, false, true);
            this.props.onCloseDateDialog();
        }
        return(
            <div className="change-date-dialog-container">
                <div className="change-date-dialog-item-container">
                    <div className="change-date-dialog-item-text">Today</div>
                    {/* <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isTodaySelected} onSelectDateAction ={props.onSelectDateAction} type="today" data={!props.isTodaySelected}   onItemClicked={onDateSelected("today", !props.isTodaySelected)}></CustomCheckbox> */}
                    <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={this.props.isTodaySelected}  type="today" data={!this.props.isTodaySelected} task={this.props.task} onItemClicked={onTodaySelected} isDateDialogOpened={this.props.isDateDialogOpened}></CustomCheckbox>
                </div>
                <div className="change-date-dialog-item-container">
                    <div className="change-date-dialog-item-text">Tomorrow</div>
                    <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={this.props.isTomorrowSelected} type="tomorrow" data={!this.props.isTomorrowSelected} task={this.props.task} onItemClicked={onTomorrowSelected} isDateDialogOpened={this.props.isDateDialogOpened}></CustomCheckbox>
                </div>
                <div className="change-date-dialog-item-container" style={{border: 'none'}}>
                    <div className="change-date-dialog-item-text">Next Week ({nextWeek})</div>
                    <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={this.props.isNextWeekSelected} type="next week" data={!this.props.isNextWeekSelected} task={this.props.task} onItemClicked={onNextWeekSelected} isDateDialogOpened={this.props.isDateDialogOpened}></CustomCheckbox>
                </div>
    
            </div>
        )
    }
}

function mapStateToProps(store){
    return {
       
    }
}

const mapActionsToProps = {
    //onSelectDateAction
}


// const ChangeDateDialog = (props) => {

//     const nextWeek = moment().add(1, 'weeks').startOf('isoWeek').format("DD MMM");

//     const onDateSelected = (type, data, id) => {
//         console.log(" I am getting called");
//         props.onSelectDateAction(type, data, id);
//     }



//     console.log("Change Data Dialog Getting called");

//     return(
//         <div className="change-date-dialog-container">
//             <div className="change-date-dialog-item-container">
//                 <div className="change-date-dialog-item-text">Today</div>
//                 {/* <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isTodaySelected} onSelectDateAction ={props.onSelectDateAction} type="today" data={!props.isTodaySelected}   onItemClicked={onDateSelected("today", !props.isTodaySelected)}></CustomCheckbox> */}
//                 <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isTodaySelected}  type="today" data={!props.isTodaySelected} task={props.task} onItemClicked={onDateSelected}></CustomCheckbox>
//             </div>
//             <div className="change-date-dialog-item-container">
//                 <div className="change-date-dialog-item-text">Tomorrow</div>
//                 <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isTomorrowSelected} type="tomorrow" data={!props.isTomorrowSelected} task={props.task} onItemClicked={onDateSelected}></CustomCheckbox>
//             </div>
//             <div className="change-date-dialog-item-container" style={{border: 'none'}}>
//                 <div className="change-date-dialog-item-text">Next Week ({nextWeek})</div>
//                 <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isNextWeekSelected} type="next week" data={!props.isNextWeekSelected} task={props.task} onItemClicked={onDateSelected}></CustomCheckbox>
//             </div>

//         </div>
//     )
// }

export default connect(mapStateToProps, mapActionsToProps)(ChangeDateDialog);