/**
 * Created By Nikita
 * 11th Aug 2018
 */
/**
 * Will normalize the project acl list..
 */
export const normalizeProjectAcl = (projectAclList) => {
    const projectAclObj = {};
    const projectObj = {};
    if(projectAclList && projectAclList.length){
        projectAclList.forEach(projectAcl => {
            projectAclObj[projectAcl.id] = projectAcl;
            if(projectAclList && projectAclList.length){
                projectAclList.forEach(projectAcl => {
                   if(projectAcl.project && projectAcl.project.id){
                       projectObj[projectAcl.project.id]  = {
                           projectAclId : projectAcl.id
                       }
                   }
                })
            }
        })
    }
    return {
        projectAclObj,
        projectObj
    };
}
