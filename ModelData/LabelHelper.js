/**
 * Created By Nikita 
 * 11th of Aug 2018
 */

/**
 * Will normalize the user list data..
 */
export const normalizeLabelData = (labelList) => {
    const labelObj = {};
    const labelIds = [];
    if (labelList && labelList.length) {
        labelList.forEach(label => {
            labelObj[label.id] = label;
            labelIds.push(label.id);
        });
    }
    return {
        labelObj,
        labelIds
    }
}