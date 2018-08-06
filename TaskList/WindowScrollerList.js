/**
 * Creaeted by Robins 
 * 6th Aug 2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { List, WindowScroller } from 'react-virtualized';



class VirtualList extends Component{

    render() {
        const {renderRow, totalTasks, height, isScrolling, scrollTop} = this.props;

        return (
            <List
                ref={(instance) => {
                    this.List = instance;
                }}
                width={800}
                rowCount={totalTasks}
                rowHeight={41}
                rowRenderer={renderRow}
                autoHeight
                height={height}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
            />
        )
    }
}


export default VirtualList;
