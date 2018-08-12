import React from 'react';
import { 
  Image
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



//Local Style will be written here..
const style = {
    topNav:{
      paddingLeft: "8px",
      fontSize: "1.4em",
      verticalAlign: "middle",
      fontWeight: "500"
    }
  };
  


/**
 * Fetch the login top navigation data..
 */
const TopNavHeader = function({routes:{landingPageRoute}}){
    return(
    <div>
      <Link to={landingPageRoute}>
        {getLogo()}
        <span className="dark-text link" style={style.topNav}>
          SNAPHY
        </span>
      </Link>
    </div>
  );
};


/**
 * Will fetch the logo of Snaphy
 */
const getLogo = () => (
    <Image
      inline
      src='/logo57x57.png'
      size='mini'
    />
)




// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    routes:{
      landingPageRoute: store.CustomRouteReducer.landingPage,
    }
  };
}


export default connect(mapStateToProps)(TopNavHeader);
  