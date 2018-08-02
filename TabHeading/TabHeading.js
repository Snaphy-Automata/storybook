/**
 * Created By Robins
 * 28th June 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'
import map from 'lodash/map';
import {connect} from 'react-redux';


//Custom Import...
import { hideActiveTabAction, showActiveTabAction} from "./TabHeadingAction";
//style
import "./TabHeading.css";


/**
 * TabHeading Component..
 * @param {*} props
 */
class TabHeading extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let {items, tabId, showActiveTabAction} = this.props;
    if(items && items.length){
      for(let i=0; i< items.length;i++){
        const item = items[i];
        if(item.isActive){
          //Activate the tabs..
          showActiveTabAction(tabId, item.key);
          break;
        }
      }
    }
  }

  render(){
    let {className, style, items, tabId,  hideActiveTabAction, showActiveTabAction, tabConfigReducer} = this.props;
    className = className || "";
    className = `grid-view-top-header-tab-container ${className}`;

    const tabConfig = tabConfigReducer[tabId];
    let displayHideButton = tabConfig && tabConfig.active? true: false;
    style = style || {};

    const onHideButtonClick = () => {
      //Remove active button
      hideActiveTabAction(tabId);
    };

    /**
     * Tab List..
     */
    const tabsComp = map(items, (item, key) => {
      let className = `grid-view-top-header-tab-container-list-item`;
      let showTab = false;
      if(tabConfig && item.key === tabConfig.active){
        className = `${className} active`;
        showTab = true;
      }else{
        className = `${className}`;
      }

      const onClick= ()=>{
        if(showTab){
          //Hide the filter button..
          onHideButtonClick();
        }else{
          //Display active tab..
          showActiveTabAction(tabId, item.key);
        }
        item.onClick(!showTab);
      }

      return (
        <li key={key} onClick={onClick} className={className}>
          { item.icon && <Icon name={item.icon}></Icon> }
          <div className="grid-view-top-header-border-active">
            {item.title}
          </div>
        </li>
      )
    });

    return (
      <div className={className} style={style}>
        <ul  className="grid-view-top-header-tab-container-list-wrapper">
          {tabsComp}
          {displayHideButton && <li onClick={onHideButtonClick} className="grid-view-close-btn-filter" >Hide</li>}
        </ul>
      </div>
    );
  }
} //TabHeading class..


//TabHeading PropTypes..
TabHeading.propTypes = {

};



// Retrieve data from store as props
function mapStateToProps(store) {
  const tabConfigReducer = store.TabHeadingReducer;
  return {
     //Add states here..
     tabConfigReducer,
  };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  hideActiveTabAction,
  showActiveTabAction,
};



export default connect(mapStateToProps, mapActionsToProps)(TabHeading);
