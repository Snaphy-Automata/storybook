import React from "react";
import PropTypes from 'prop-types';
import {
    Card,
    Icon,
    Button,
} from 'semantic-ui-react';

//Custom Import

import './index.css';


const SnaphyCard = ({ heading, onDeleteBtnClicked, onEditBtnClicked, subHeadingComponent  }) => {
  return (
      <Card fluid className="snaphy-card-container">
        <Card.Content>
            <Card.Header style={{
              display: 'table',
              width: '100%'
            }}>
                <div className="snaphy-header-verticaly-middle snaphy-card-header">
                  <div style={{
                    display: 'inline-block'
                  }}>
                    {heading}
                  </div>
                </div>
                <div className="snaphy-header-verticaly-middle snaphy-header-btn-wrapper">
                  <Button basic onClick={onEditBtnClicked} color='blue' className="snaphy-card-edit-button" size="mini" content="Edit" ></Button>
                </div>
                <div className="snaphy-header-verticaly-middle snaphy-header-vertically-close-btn-container">
                  <Icon link onClick={onDeleteBtnClicked} className='snaphy-card-close-icon' size="small" name='delete' />
                </div>
            </Card.Header>
            <Card.Meta className="snaphy-card-meta-wrapper">
              {
                subHeadingComponent
              }
            </Card.Meta>
        </Card.Content>
      </Card>
  );
};



SnaphyCard.prototypes= {
  heading: PropTypes.string,
  onEditBtnClicked: PropTypes.func,
  onDeleteBtnClicked: PropTypes.func,
  subHeadingComponent: PropTypes.any,
}



export default SnaphyCard;
