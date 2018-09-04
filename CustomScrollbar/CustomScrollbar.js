import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

//Custom Import
import './CustomScrollbar.css';


/**
 * Will return custom scrollbar
 * @param {*} props
 */
class CustomScrollbar extends Component {
  constructor(props){
    super(props)
  }

  render(){

    const {id, onScroll} = this.props;
    return (
      <Scrollbars
        renderThumbVertical={props => <div {...props} className="react-thumb-vertical"/>}
        id={id}
        style={{ width: "100%", height: "100%" }}
        universal
        onScroll={onScroll}
        // This will activate auto hide
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        thumbMinSize={50}
        // Duration for hide animation in ms.
        autoHideDuration={300}>
        {this.props.children}
      </Scrollbars>
    )
  }
}



export default CustomScrollbar;
