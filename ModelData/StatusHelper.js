/**
 * Created By Nikita 
 * 11th Aug 2018
 */

export const normalizeStatusData = (statusList) => {
    const statusObj = {},
    const statusIds =[];
    if (statusList && statusList.length) {
        statusList.forEach(status => {
            statusObj[status.id] = status;
            statusIds.push(status.id);
        });
    }
    return {
        statusObj,
        statusIds
    }
}