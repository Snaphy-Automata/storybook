/*
Created By Robins
10th April 2018
*/
import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';


//Local Style will be written here..
const loginStyle = {
  container:{
    padding: "3em"
  },
  heading: {
    textAlign: "center",
    fontFamily: "'DyLin', serif ,'Lato', sans-serif",
    fontSize: "3.5em",
    paddingTop: "1em",
    paddingBottom: "0.6em"
  },
  subHeading:{
    textAlign: "center",
    paddingTop: "0.5em",
    fontSize: "1.72em",
    fontFamily: "'DyLin', serif ,'Lato', sans-serif",
  },
  loginInButton:{
    fontFamily: "'DyLin', serif ,'Lato', sans-serif",
    paddingLeft: "2.3em",
    paddingRight: "2.3em",
    paddingTop: "0.7em",
    paddingBottom: "0.6em",
    marginTop: "2em"
  },
  forgotPassword:{
    fontFamily: "'DyLin', serif ,'Lato', sans-serif",
    fontSize: "1.12em"
  },
  terms:{
    paddingTop: "1em",
    paddingLeft: "8em",
    paddingRight: "8em",
    fontFamily: "DyLin, serif, Lato, sans-serif",
    fontSize: "1.1em"
  }
};

const colorClass = {
  "#ffc162": 'btn-yellow',
  "#a177ff": 'btn-purple',
  "#2ecc71": 'btn-green',
  "#ff1744": 'btn-red',
  "#3b86ff": 'btn-blue',
}

/*
Project Card Components..
 */
const CircularButton = function({color, content, style, onClick, size}){
    const customStyle = style || {};
    style = {
        ...customStyle
    };

    const btnSize = size || "big";

    const className = `circular-button ${colorClass[color]}`;

    return (
        <Button className={className} size={btnSize} onClick={onClick}  content={content}  style={style}   />
    );
};


CircularButton.propTypes = {
    //Project data fetched using GraphQL
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default CircularButton;
