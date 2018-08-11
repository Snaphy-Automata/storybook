/**
 * Created by Robins
 * 11th Aug 2018
 */


 export const normalizeUserSettingData = (userSettingObj) => {
     const data = {
         //Will store a reference by id for fast fetching..
         closedSectionObjId:{}
     };
    if(userSettingObj && userSettingObj.closedSectionIds && userSettingObj.closedSectionIds.length){
        userSettingObj.closedSectionIds.forEach(id => {
            data.closedSectionObjId[id] = true;
        })
    }else{
        data.closedSectionIds = [];
        data.closedSectionObjId = {};
    }

    return data;
 }