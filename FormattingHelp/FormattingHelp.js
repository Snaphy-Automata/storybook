import React from 'react';
import {Icon} from 'semantic-ui-react';
import Markdown from 'react-markdown'

import './FormattingHelp.css';
import CustomScrollbar from '../CustomScrollbar';

const FormattingHelp = (props) => {
    const {onClose} = props;
    const onCloseDialog = (e) => {
        e.preventDefault();
        onClose();
    }
    return (
        <div className="formatting-help-container">
            <div >
                <div className="formatting-help-text">Formatting Help</div>
                <div className="formatting-help-close-container" onMouseDown={onCloseDialog}>
                    <Icon name="close"></Icon>
                </div>
                
            </div>
            <div className="formatting-help-header-text">
                <hr/>
            </div>
           
            {/* <CustomScrollbar> */}
            <div className="formatting-help-all-data-container">
                <CustomScrollbar>
                <div className="formatting-help-header-text">Project Uses Makdown for formatting. Here are the basics</div>
                <div className="formatting-help-header-text">
                    <hr/>
                </div>
                <div className="formatting-help-heading-text">First level Header</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        Making Scrambled Eggs: A Primer
                    ```"/>
                    <Markdown source="```
                    ===============================
                    ```"/>
                </div>
                <div className="formatting-help-header-text">
                    <hr/>
                </div>
                <div className="formatting-help-heading-text">Second Level Header</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        1.1: Preparation
                    ```"/>
                    <Markdown source="```
                        ----------------
                    ```"/>
                </div>
                <div className="formatting-help-header-text">
                    <hr/>
                </div>
                <div className="formatting-help-heading-text">Bold</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        **Carefully** crack the eggs.
                    ```"/>

                </div>
                <div className="formatting-help-header-text">
                    <hr/>
                </div>
                <div className="formatting-help-heading-text">Emphasis</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        Whisk the eggs *vigorously*.
                    ```"/>
                </div>
                <div className="formatting-help-header-text">
                    <hr/>
                </div>
                <div className="formatting-help-heading-text">Lists</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        Ingredients:

                    ```"/>
                    <Markdown source="```

                    ```"/>
                    <Markdown source="```
                        - Eggs
                    ```"/>
                    <Markdown source="```
                        - *Optional:* milk
                    ```"/>
                </div>
                <div className="formatting-help-header-text">
                    <hr/>
                </div>
                <div className="formatting-help-heading-text">Links</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        To download a PDF version of the recipe, [click here](https://example.com/scrambled-eggs.pdf).
                    ```"/>
                </div>
                <div className="formatting-help-header-text">
                    <hr/>
                </div>
                <div className="formatting-help-heading-text">Images</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        ![The Finished Dish](https://example.com/eggs.png)
                    ```"/>
                </div>
                </CustomScrollbar>
            </div>
            {/* </CustomScrollbar> */}
            
            


          

        </div>
    )
}


export default FormattingHelp;