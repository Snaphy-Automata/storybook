/**
 * Created by Nikita
 * 11th Aug 2018
 */


export const normalizePageData = (pageList) => {
    const pageObj = {}
    let pageIds = []
    if(pageList && pageList.length){
        pageList.forEach(page => {
            pageObj[page.id] = page.id;
            pageIds.push(page.id);
        })
    }

    return {
        pageObj,
        pageIds
    }
}