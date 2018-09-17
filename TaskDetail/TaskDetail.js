/**
 * Created by Robins
 * 17th Sept 2018
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './TaskDetail.css';


//Custom import..
import Header from './Header'


class TaskDetail extends PureComponent{
  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props){
    super(props)
    this.onSubTaskAdded = this.onAddSubTasksToList.bind(this)
  }


  onAddSubTasksToList(){
    //FIXME: Robins
    //17th Sept ..
    //Modify only pass array of ids.
    // let subTaskDataList = [...subTaskList];
    // if(subTaskDataList.length){
    //     if(subTaskDataList[subTaskDataList.length-1].id){
    //         subTaskDataList.push({});
    //     }
    // } else{
    //     subTaskDataList.push({});
    // }

    // //console.log("Add SubTask getting called", subTaskDataList);
    // onAddSubTask(selectedTask.id, subTaskDataList, "empty", null, null);
  }

  render(){
    return (
      <div>
        <Header onSubTaskAdded={this.onSubTaskAdded} />
      </div>
    )
  }
}


export default TaskDetail;
