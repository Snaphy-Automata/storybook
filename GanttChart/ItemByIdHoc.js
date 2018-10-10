/**
 * Created by Robins Gupta
 * 10th Sept 2018
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

//Custom Import..


const ItembyIdHoc = (WrappedComponent, projectId)=>{

  class ItemEnhancer extends Component{
    static propTypes = {
      itemId: PropTypes.string.isRequired,
      item: PropTypes.object
    }

    render(){
      return(
        <WrappedComponent {...this.props} />
      )
    }
  } //end class




  // Retrieve data from store as props
  function mapStateToProps(store, props) {
    const itemId           = props.itemId;
    const modelDataReducer = store.ModelDataReducer;
    const item             = modelDataReducer.task.byId[itemId];

    return {
      item
    };
  }

   //Map Redux Actions to Props..
  const mapActionsToProps = {

  };


  const ItembyIdHocData = connect(mapStateToProps)(ItemEnhancer)
  return ItembyIdHocData;
}


/**
 * Hoc with projectId..
 */
const ItembyHocByProjectId = (projectId)=>{
  return (WrappedComponent)=>{
    return ItembyIdHoc(WrappedComponent, projectId);
  }
}


export default ItembyHocByProjectId
