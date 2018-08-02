/**
 * Created by Robins
 * 4th June 2018
 */

import {TAB_HEADING_HIDE_BTN_STATUS, TAB_HEADING_SHOW_BTN_STATUS} from './TabHeadingAction';


//Set initial state for gridview reducer..
const initialState = {};
const TabHeadingReducer = (state = initialState, action) => {
  switch (action.type){
    case TAB_HEADING_HIDE_BTN_STATUS: {
      state = {
          ...state,
          [action.payload]:{
            active: null
          }
      };
      break;
    }

    case TAB_HEADING_SHOW_BTN_STATUS: {
      state = {
          ...state,
          [action.payload.tabParentId]:{
            active: action.payload.tabKey
          }
      };
      break;
    }
  }

  return state;
};


export default TabHeadingReducer;
