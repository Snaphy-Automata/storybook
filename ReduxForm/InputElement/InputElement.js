import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

import "./inputElement.css"

class InputElement extends React.PureComponent{

  static propTypes = {
    //Properties
    style: PropTypes.object,
    rows: PropTypes.number,
    className: PropTypes.string,
    autoFocus: PropTypes.bool,
    blurOnEnter: PropTypes.bool,
    placeholder: PropTypes.string,
    autoHeight: PropTypes.bool,
    //Methods
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,

  }


  static defaultProps = {
    style: {},
    className: "",
    rows: 1,
    autoFocus: false,
    blurOnEnter: true,
    autoHeight: true,
    placeholder: "Enter value",
  }

  constructor(props){
    super(props)
    this.onBlurEvent    = this._onBlurEvent.bind(this)
    this.onKeyPress     = this._onKeyPress.bind(this)
    this.onChange       = this._onChange.bind(this)
  }


  _onBlurEvent(e){
    const {onBlur} = this.props
    e.preventDefault();
    onBlur? onBlur(e): null
  }

  _onKeyPress(e){
    const {blurOnEnter, onKeyPress} = this.props
    if(blurOnEnter && e.key === 'Enter'){
        e.preventDefault();
        e.target.blur();
    }
    onKeyPress? onKeyPress(e): null
  }

  _onChange(event, data){
    const {input, onChange} = this.props
    event.preventDefault()
    input && input.onChange ?input.onChange(data.value):null
    if(onChange){
      onChange(data.value);
    }
  }


  render(){
    const {
      placeholder,
      rows,
      autoFocus,
      autoHeight,
    } = this.props


    const styleObj = {
      paddingLeft: "11.5px",
      paddingRight: "11.5px",
      paddingTop: "5px",
      paddingBottom: "5px",
      minHeight: 25,
      lineHeight: "25px",
      overflow: "hidden",
      ...this.props.style,
    }

    let className = "input-element-text-area"

    if(this.props.className){
      className = `${this.props.className} ${className}`
    }

    return (
      <Form.TextArea
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows = {rows}
        autoHeight={autoHeight}
        className={className}
        onBlur = {this.onBlurEvent}
        onKeyPress = {this.onKeyPress}
        onChange={this.onChange}
        style={styleObj}
      />
    )
  }
}




export default InputElement;
