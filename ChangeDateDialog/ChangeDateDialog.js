import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

//Custom Import
import './ChangeDateDialog.css'
import CustomCheckbox from '../CustomCheckbox';
import {getNextWeekDate, compareDate} from '../../baseComponents/GridView/components/formatDate'

//import {oimport { bindActionCreators } from 'redux';



class ChangeDateDialog extends PureComponent{
    static nextWeek = null


    constructor(props){
        super(props)
        console.log("Change Date Dialog Props", props);
        this.nextWeek = getNextWeekDate()
        this.state = {
            isTodaySelected : false,
            isTomorrowSelected : false,
            isNextWeekSelected : false
        }
       

        this.onTodaySelected    = this._onTodaySelected.bind(this)
        this.onTomorrowSelected = this._onTomorrowSelected.bind(this)
        this.onNextWeekSelected = this._onNextWeekSelected.bind(this)

    }


    componentDidMount(){
        const {endDate} = this.props
        if(endDate.title === "Today"){
            this.setState({
                isTodaySelected : true
            })
        } else if(endDate.title === "Tomorrow"){
            this.setState({
                isTomorrowSelected : true
            })
        } else if(endDate.title === this.nextWeek){
            this.setState({
                isNextWeekSelected : true
            })
        }
    }

    _onTodaySelected(){
        const {onUpdateDueDate, onCloseDateDialog} = this.props
        this.setState({
            isTodaySelected : !this.state.isTodaySelected,
            isTomorrowSelected : false,
            isNextWeekSelected : false
        })
       onUpdateDueDate(new Date())
       onCloseDateDialog()
    }


    _onTomorrowSelected(){
        const {onUpdateDueDate, onCloseDateDialog} = this.props
        this.setState({
            isTomorrowSelected : !this.state.isTomorrowSelected,
            isTodaySelected : false,
            isNextWeekSelected : false
        })
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1)
        onUpdateDueDate(new Date(currentDate))
        onCloseDateDialog()

    }

    _onNextWeekSelected(){
        const {onUpdateDueDate, onCloseDateDialog} = this.props
        this.setState({
            isNextWeekSelected : !this.state.isNextWeekSelected,
            isTodaySelected : false,
            isTomorrowSelected : false
        })
        var d = new Date();
       
        d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7)
        if(compareDate(new Date(), new Date(d)).title === "Today"){
            d.setDate(d.getDate() + (7-d.getDay())%7+1);
        } 
        onUpdateDueDate(new Date(d))
        onCloseDateDialog()
    }



    render(){

        const {isTodaySelected, isTomorrowSelected, isNextWeekSelected} = this.state

        return(
            <div className="change-date-dialog-container">
                <div className="change-date-dialog-item-container">
                    <div className="change-date-dialog-item-text">Today</div>
                    {/* <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={this.props.isTodaySelected}  type="today" data={!this.props.isTodaySelected} task={this.props.task} onItemClicked={onTodaySelected} isDateDialogOpened={this.props.isDateDialogOpened}></CustomCheckbox> */}
                    <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" type="today" isSelected={isTodaySelected} onItemClicked={this.onTodaySelected}></CustomCheckbox>
                </div>
                <div className="change-date-dialog-item-container">
                    <div className="change-date-dialog-item-text">Tomorrow</div>
                    <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" type="tomorrow" isSelected={isTomorrowSelected} onItemClicked={this.onTomorrowSelected}></CustomCheckbox>
                </div>
                <div className="change-date-dialog-item-container" style={{border: 'none'}}>
                    <div className="change-date-dialog-item-text">Next Week ({this.nextWeek})</div>
                    <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" type="next week" isSelected={isNextWeekSelected} onItemClicked={this.onNextWeekSelected}></CustomCheckbox>
                </div>
    
            </div>
        )
    }
}

export default ChangeDateDialog;