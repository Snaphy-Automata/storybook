import React from 'react';
import {Icon} from 'semantic-ui-react';
import Markdown from 'react-markdown'

import './FormattingHelp.css';

const FormattingHelp = (props) => {
    return (
        <div className="formatting-help-container">
            <div >
                <div className="formatting-help-text">Formatting Help</div>
                <div className="formatting-help-close-container">
                    <Icon name="close"></Icon>
                </div>
                
            </div>
            <hr/>
            <div className="formatting-help-all-data-container">
                <div>Project Uses Makdown for formatting. Here are the basics</div>
                <hr/>
                <div className="formatting-help-heading-text">First level Header</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        Making Scrambled Eggs: A Primer
                        ===============================
                    ```"/>
                </div>
                <hr/>
                <div className="formatting-help-heading-text">Second Level Header</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        1.1: Preparation
                    ```"/>
                    <Markdown source="```
                        ----------------
                    ```"/>
                </div>
                <hr/>
                <div className="formatting-help-heading-text">Bold</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        **Carefully** crack the eggs.
                    ```"/>

                </div>
                <hr/>
                <div className="formatting-help-heading-text">Emphasis</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        Whisk the eggs *vigorously*.
                    ```"/>
                </div>
                <hr/>
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
                <hr/>
                <div className="formatting-help-heading-text">Links</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        To download a PDF version of the recipe, [click here](https://example.com/scrambled-eggs.pdf).
                    ```"/>
                </div>
                <hr/>
                <div className="formatting-help-heading-text">Images</div>
                <div className="formatting-help-data-container">
                    <Markdown source="```
                        ![The Finished Dish](https://example.com/eggs.png)
                    ```"/>
                </div>
            </div>
            


          

        </div>
    )
}


export default FormattingHelp;