import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

import "./inputElement.css"

const InputElement = (props) => {

  const onBlurEvent = (e)=>{
    const {onBlur} = props
    e.preventDefault();
    onBlur? onBlur(e): null
  }

  const onKeyPress = (e) => {
    const {blurOnEnter, onKeyPress} = props
    if(blurOnEnter && e.key === 'Enter'){
        e.preventDefault();
        e.target.blur();
    }
    onKeyPress? onKeyPress(e): null
  }

  const onChange = (event, data) => {
    const {input, onChange} = props
    event.preventDefault()
    //Use set time out to prevent race condition..
    input && input.onChange ?input.onChange(data.value):null
    if(onChange){
      onChange(data.value);
    }
  }

  const {
    placeholder,
    rows,
    autoFocus,
    autoHeight,
    value,
  } = props
  const valueStr = value?value:""
  const styleObj = {
    paddingLeft: "11.5px",
    paddingRight: "11.5px",
    paddingTop: "5px",
    paddingBottom: "5px",
    minHeight: 25,
    lineHeight: "25px",
    overflow: "hidden",
    ...props.style,
  }

  let className = "input-element-text-area"

  if(props.className){
    className = `${props.className} ${className}`
  }

  return (
    <Form.TextArea
      placeholder={placeholder}
      autoFocus={autoFocus}
      rows = {rows}
      autoHeight={autoHeight}
      className={className}
      onBlur = {onBlurEvent}
      onKeyPress = {onKeyPress}
      onChange={onChange}
      style={styleObj}
      value={valueStr}
    />
  )
}



InputElement.propTypes = {
  //Properties
  style: PropTypes.object,
  rows: PropTypes.number,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  blurOnEnter: PropTypes.bool,
  placeholder: PropTypes.string,
  autoHeight: PropTypes.bool,
  value: PropTypes.any,
  //Methods
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,

}


InputElement.defaultProps = {
  style: {},
  className: "",
  rows: 1,
  autoFocus: false,
  blurOnEnter: true,
  autoHeight: true,
  placeholder: "Enter value",
}




export default InputElement;
