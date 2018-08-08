import React from 'react';
import {Container, Input, List} from 'semantic-ui-react';

import './AllTasks.css';

export default class Example extends React.Component {
    constructor(props) {
      super(props)
      this.handleKeyDown = this.handleKeyDown.bind(this)
      this.state = {
        cursor: 0,
        result: [
            {id: "1", title:"Item1"},
            {id : "2", title: "Item2"},
            {id : "3", title:"Item3"},
            {id : "4", title:"Item4"}
    ]
      }
    }
  
    handleKeyDown(e) {
      const { cursor, result } = this.state
      console.log("I am getting called", cursor);
      // arrow up/down button should select next/previous list element
      if (e.keyCode === 38 && cursor > 0) {
        this.setState( prevState => ({
          cursor: prevState.cursor - 1
        }))
      } else if (e.keyCode === 40 && cursor < result.length - 1) {
        this.setState( prevState => ({
          cursor: prevState.cursor + 1
        }))
      }
    }
  
    render() {
      const { cursor } = this.state

      const getClassName = function(cursor, i){
         
          let className = "item-background-color"
          if(cursor === i){
              className = "item-selected-background-color"
          } 
          console.log("Class Name getting called", className, cursor, i);
          return className;
      }
  
      return (
        <Container>
          <div >
            {
              this.state.result.map((item, i) => (
                <div
                 onKeyDown={ this.handleKeyDown }
                 tabIndex= {i}
                  key={ item.id }
                  className={getClassName(cursor, i)}
                >
                  <span>{ item.title }</span>
                </div>
              ))
            }
          </div>
        </Container>
      )
    }
  }