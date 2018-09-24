/**
 * Created by Robins Gupta
 * 24th Sept 2018
 */

import React, {
  PureComponent
} from 'react'
import PropTypes from 'prop-types'

import "./TaskLabels.css"

//Custom import
import Label from '../SelectLabel'


class TaskLabels extends PureComponent {
  static defaultProps = {
    labelIds: []
  }

  static propTypes = {
    labelIds: PropTypes.array,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="task-labels-container">
        <Label name="demo"  />
      </div>
    )
  }
}


export default TaskLabels
