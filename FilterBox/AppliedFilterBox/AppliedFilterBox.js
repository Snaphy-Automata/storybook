import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'


//Custom Import...
//style
import "./AppliedFilterBox.css";


/**
 * Grid View Component..
 * @param {*} props
 */
const AppliedFilterBox = ({onClick, label, className, style}) => {

  className = className || "";
  className = `applied-filter-box ${className}`

  style = style || {};

  return (
    <div onClick={onClick} className={className} style={style}>
      <span style={{
        textTransform: 'capitalize'
      }}>{label}</span>
      <span className="applied-filter-box-btn">
        <Icon style={{
          marginRight:0
        }} name='close' />
      </span>
    </div>
  );
};



AppliedFilterBox.propTypes = {
  //GridView data fetched using GraphQL
  //GridView ROuter..
  // match: PropTypes.shape({
  //     params: PropTypes.shape({
  //         projectId: PropTypes.string.isRequired,
  //         projectSlug: PropTypes.string.isRequired,
  //     }),
  // }).isRequired,
}





export default AppliedFilterBox;
