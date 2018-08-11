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


export const normalizePanelData = (panelList) => {
    const panelObj = {}
    if(panelList && panelList.length){
        panelList.forEach(panel => {
            panelObj[panel.id] = panel.id;
        })
    }
    return panelObj;
}