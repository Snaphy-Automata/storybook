/**
 * Created by Robins Gupta
 * 28th Sept 2018
 */

import React, {PureComponent}  from 'react'
import PropTypes               from 'prop-types'
import { Icon, Popup }         from 'semantic-ui-react'

//Style.
import "./OptionPopup.css"

//Custom import..


class OptionPopup extends PureComponent{

  static propsTypes = {
    style: PropTypes.object,
    position: PropTypes.string,
    heading: PropTypes.string,
    verticalOffset: 0,
    on: PropTypes.string,
    basic: PropTypes.bool,
  }

  static defaultProps = {
    on: "click",
    position: "bottom right",
    verticalOffset:0,
    heading:"",
    basic: true,
    close: false,
    className : "option-popup-container",
    style:{
      right: "23px",
      padding:0
    }
  }

  constructor(props){
    super(props)
    this.onDialogClose = this._onDialogClose.bind(this)
    this.onClose       = this._onClose.bind(this)
    this.onOpen        = this._onOpen.bind(this)
    this.state = {
      isDialogDisplayed: false
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.close !== this.props.close){
      this.onClose? this.onClose():null
      //return false;
    }
   else return null;
  }

  _onDialogClose(){
    this.setState({
      isDialogDisplayed: false,
    })
  }

  _onClose(e){
    console.log("On Close getting called")
    this.setState({
      isDialogDisplayed: false,
    })
  }

  _onOpen(e){
    this.setState({
      isDialogDisplayed: true,
    })
  }

  render(){
    const {
      on,
      position,
      trigger,
      heading,
      style,
      verticalOffset,
      basic,
      className
    } = this.props

    const {isDialogDisplayed} = this.state



    return (
      <Popup
        open={isDialogDisplayed}
        onClose={this.onClose}
        onOpen={this.onOpen}
        style={style}
        basic={basic}
        verticalOffset={verticalOffset}
        trigger={trigger}
        content={
          <div className={className}>
            {
            heading &&
            <div className="option-popup-dialog-header">
              <div style={{display:"inline-block"}}>{heading}</div>
                <div onClick={this.onDialogClose} style={{float:"right", cursor:'pointer'}}>
                    <Icon name="close"/>
                </div>
              </div>
            }
            <div className="option-popup-dialog-body">
              {this.props.children}
            </div>
          </div>
        }
        on={on}
        position={position}
      />
    )
  }
}

export default OptionPopup
