import React from 'react';
import {Modal, Icon, Input, Button} from 'semantic-ui-react';

import './ShareDialog.css';


const ShareDialog = () => {
    return (
        <div>
            <Modal size="small" open>
                <div>
                    <div className="share-dialog-header">
                        <Icon name="share alternate"></Icon>
                        <div style={{display:"inline-block", marginLeft:10}}>Share with others</div>
                        <div style={{float:"right", cursor:'pointer'}}>
                            <Icon name="close"/>
                        </div>
                    </div>
                    <div className="share-dialog-content-container">
                        <div className="share-dialog-email-container">
                            <div className="share-dialog-email-address-container">
                                <div className="share-dialog-content-heading">Share via email</div>
                                <div style={{marginTop:10}}>
                                    <Input placeholder="Enter email address" transparent></Input>
                                </div>

                            </div>
                            <div className="share-dialog-view-share-button-container">
                                <div className="share-dialog-view-button-container">
                                    <Button basic color="grey" disabled size="tiny" content="Can View" icon="angle down" labelPosition="right"></Button>
                                </div>
                                <div className="share-dialog-share-button-container">
                                    <Button color="blue" size="tiny" content="Share" icon="share alternate" labelPosition="left"></Button>
                                </div>
                            </div>
                        </div>
                        <div className="share-dialog-link-container">
                            <div style={{marginBottom:10}}>
                                <div className="share-dialog-link-address-container">
                                    <div className="share-dialog-content-heading">Anyone with the link</div>
                                    <div style={{marginTop:5}} className="share-dialog-sub-content-heading">Anyone who has the link can access the board. No sign in required.</div>
                                    <div style={{marginTop:10}}>
                                        <Input placeholder="Link" transparent></Input>
                                    </div>
                                </div>
                                <div className="share-dialog-view-copy-button-container">
                                    <div className="share-dialog-edit-view-container">
                                        <Button basic color="grey" disabled size="tiny" content="Can Edit" icon="angle down" labelPosition="right"></Button>
                                    </div>
                                    <div className="share-dialog-copy-button-container">
                                        <Button color="blue" size="tiny" content="Copy" icon="copy" labelPosition="left"></Button>
                                    </div>   

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ShareDialog;