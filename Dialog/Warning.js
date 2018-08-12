// Created on 8th June 2018
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
} from 'semantic-ui-react';

const WarningDialog = function({size, isOpened, onNoClicked, onYesClicked, title, description}){
  const modalSize = size || 'mini';
  const that = this;
  return (
    <div>
      <Modal size={modalSize} open={isOpened} >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          {description && <p>{description}</p> }
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onNoClicked} >No</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={onYesClicked} />
        </Modal.Actions>
      </Modal>
    </div>
  )
};


//Define the shapes..
WarningDialog.propTypes = {
  size: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onNoClicked: PropTypes.func.isRequired,
  onYesClicked: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}




export default WarningDialog;
