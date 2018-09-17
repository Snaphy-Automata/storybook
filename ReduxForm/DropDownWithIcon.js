import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Dropdown} from 'semantic-ui-react';

//Custom Import...
import "./DropDownWithIcon.css";



/**
 * DropDownFilter Component..
 * @param {*} props
***/
const DropDownFilter = (props) => {
  const { options, icon, placeholder, className} = props;
  let classNameStr = `dropdown-with-icon-filter`;
  if(className){
    classNameStr = `${className} ${classNameStr}`
  }
  return (
    <div className={classNameStr}>
      {icon && <Icon className="dropdown-with-icon-icon-filter" name={icon} ></Icon>}
      <Dropdown
        className="dropdown-with-icon-filter-dropdown"
        options={options}
        placeholder={placeholder}
        inline={true}
      />
    </div>
  );
};


DropDownFilter.defaultProps = {
  className: "",
  icon: undefined,
}

DropDownFilter.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
  options: PropTypes.object.isRequired,
}





export default DropDownFilter;
