import React from "react";
import {
    Form,
    Message,
  } from 'semantic-ui-react';

/**
 * SnaphyForm class
 * Will handle like redux Form. With Error message support..
 **/
class SnaphyForm extends React.PureComponent{

    constructor(props){
        super(props);
    }

    //Render..
    render(){
        console.log("re-rendering snaphy form")
       let novalidate = this.props.noValidate || false;
        return (
            <Form
            noValidate={novalidate}
            onSubmit={this.props.onSubmit}
            error={this.props.error?true:false}
            style={this.props.style}
            className={this.props.className} >
                {
                    this.props.error && (<Message error={true} header={this.props.errorHeading} content={this.props.error} />)
                }
                <div>
                    {this.props.children}
                </div>
            </Form>
        );
    }
};


export default SnaphyForm;
