/**
 * Created By Robins
 * 4th July 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  } from 'semantic-ui-react'
import {connect} from 'react-redux';

//Custom Import
import {} from './TableAction';

//style
import "./Table.css";


/**
 * Table Component..
 * @param {*} props
 */
const Table = ({className, style, tableId}) => {

  className = className || "";
  className = `grid-table-container ${className}`

  style = style || {};


  return (
    <div className={className} style={style}>
      {/* Table Heading */}
      <div className="grid-table-heading-container">
        <div className="grid-table-heading-panel-prop-item">
          Name
        </div>
        <div className="grid-table-heading-panel-prop-item">
          Age
        </div>
        <div className="grid-table-heading-panel-prop-item">
          Date of birth
        </div>
        <div className="grid-table-heading-panel-prop-item">
          Has Pan Card
        </div>
        <div className="grid-table-heading-panel-prop-item">
          Hobbies
        </div>
        <div className="grid-table-heading-panel-prop-item">
          Account Number
        </div>
      </div>
      {/* Table Content. */}
      <div className="grid-table-row-container">
        <div className="grid-table-row">
          <div className="grid-table-column">
            Robins Kumar Gupta
          </div>
          <div className="grid-table-column">
            18
          </div>
          <div className="grid-table-column">
            23 April 1994
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Watching Movies
          </div>
          <div className="grid-table-column">
            99112217122
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>



        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
        <div className="grid-table-row">
          <div className="grid-table-column">
            Amit
          </div>
          <div className="grid-table-column">
            31
          </div>
          <div className="grid-table-column">
            23 April 1987
          </div>
          <div className="grid-table-column">
            true
          </div>
          <div className="grid-table-column">
            Politics
          </div>
          <div className="grid-table-column">
            991122171212
          </div>
        </div>
      </div>
    </div>
  );
};


Table.propTypes = {
  tableId: PropTypes.string.isRequired,
  //allTableConfig:
}

// Retrieve data from store as props
function mapStateToProps(store) {

  //Add states here..

  return {
    //Add states here..

  };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here

};

export default connect(mapStateToProps, mapActionsToProps)(Table);
