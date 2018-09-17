/**
 * Created by Robins
 * 15th Sept 2018
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './TaskDetail.css';


//Custom import..



class TaskDetail extends PureComponent{
  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props){
    super(props)
  }


  render(){
    return (
      <div>
        Task Detail new
      </div>
    )
  }
}


export default TaskDetail;
