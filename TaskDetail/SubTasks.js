/**
 * Created by Robins
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//Custom import..


class SubTasks extends PureComponent{
  static defaultProps = {

  }

  static propTypes = {
    taskId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }

  constructor(props){
    super(props)
  }


  render(){

    return (
      <div>
        SubTasks
      </div>
    )
  }

}


export default SubTasks
