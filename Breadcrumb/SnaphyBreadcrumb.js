import React from "react";
import PropTypes from 'prop-types';
import { Breadcrumb } from 'semantic-ui-react'
import map from 'lodash/map';


const SnaphyBreadcrumb = function(props){
    const {
        breadcrumbList

    } = props;

    return(
        <Breadcrumb style={{
            marginLeft:'0.5rem'
        }}>
        {
             map(breadcrumbList, function(breadcrumb, index){
                if(breadcrumb.type === 'section'){
                    return (
                        <Breadcrumb.Section key={index} href={breadcrumb.url}>{breadcrumb.title}</Breadcrumb.Section>
                    )
                } else{
                    return (
                        <Breadcrumb.Divider key={index}/>
                    )
                }
            })
        }
        </Breadcrumb>
    )
}

SnaphyBreadcrumb.prototypes = {
    breadcrumbList : PropTypes.array.isRequired
}


export default SnaphyBreadcrumb;