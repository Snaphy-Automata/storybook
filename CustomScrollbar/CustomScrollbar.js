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
    this.setScrollFunc = props.setScrollRef;
   // console.log(" I am getting called", props);
  }


  render(){

    let {id, onScroll, style, scrollToIndexData, setScrollRef} = this.props;
   
    style = style || {};
    let className = "react-thumb-vertical"
    className = `${className} ${this.props.className}`
    //console.log("Custom Scroll bar props",this.setScrollFunc);
    // if(scrollToIndexData &&  scrollToIndexData !== 0){
    //   this.scrollBar.scrollToBottom();
    //   //this.scrollBar.scrollToBottom();
    //   //this.scrollBar.scrollTop(scrollToIndexData);
    // }
    return (
      <Scrollbars
        // ref="customScrollBar"
         ref={(ref) => this.setScrollFunc}
        //ref={(ref) => { this.scrollBar = ref}}
        renderThumbVertical={props => <div {...props} className={className}/>}
        id={id}
        style={{ width: "100%", height: "100%", ...style }}
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
