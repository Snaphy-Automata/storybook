import React from 'react';
import PropTypes from 'prop-types';
import {Input, Form} from 'semantic-ui-react';

import "./inputElement.css"

class InputElement extends React.PureComponent{
  constructor(props){
    super(props)
    this.styleObj  = props.style || {}
    this.styleObj = {
      paddingLeft: "11.5px",
      paddingRight: "11.5px",
      paddingTop: "5px",
      paddingBottom: "5px",
      minHeight: 25,
      lineHeight: "25px",
      overflow: "hidden",
      ...this.styleObj,
    }
    this.onFocusChanged = this._onFocusChanged.bind(this)
    this.onBlurEvent    = this._onBlurEvent.bind(this)
    this.onKeyPress     = this._onKeyPress.bind(this)
    this.onChange       = this._onChange.bind(this)
  }

  _onFocusChanged(){
    //inputFocusChagedAction(true, label);
  }

  _onBlurEvent(e){
    e.preventDefault();
    //inputFocusChagedAction(false, label);
    //call autosave function..
  }

  _onKeyPress(e){
    if(e.key === 'Enter'){
        //Prevent Title from further propagating..
        //First Set Blur..
        e.preventDefault();
        e.target.blur();
        //FIXME: Save data..
        //inputFocusChagedAction(false, label);
        //call autosave function..
    }
  }

  _onChange(event, data){
    const {input, onDataChanged} = this.props
    event.preventDefault()
    input.onChange(data.value);
    if(onDataChanged){
      onDataChanged(data.value);
    }
  }


  render(){
    const {
      placeholder,
      rows,
      autoFocus,
    } = this.props


    let className = "input-element-text-area"

    if(this.props.className){
      className = `${this.props.className} ${className}`
    }

    console.log("Re-Rendering Input Element")


    return (
      <Form.TextArea
        placeholder={placeholder}
        //{...input}
        autoFocus={autoFocus}
        rows = {rows}
        autoHeight
        className={className}
        onBlur = {this.onBlurEvent}
        onKeyPress = {this.onKeyPress}
        onChange={this.onChange}
        style={this.styleObj}
      />
    )
  }
}




export default InputElement;
