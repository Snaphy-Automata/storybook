/**
 * Created By Nikita 
 * 11th of Aug 2018
 */

/**
 * Will normalize the user list data..
 */
export const normalizeUserData = (userList) => {
    const userObj = {};
    const userIds = [];
    if (userList && userList.length) {
        userList.forEach(user => {
            userObj[user.id] = user;
            userIds.push(user.id);
        });
    }
    return {
        userObj,
        userIds
    }
}