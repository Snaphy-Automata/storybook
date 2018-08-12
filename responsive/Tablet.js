import { responsiveWrapper } from 'react-responsive-redux';


const Mobile =  responsiveWrapper({ query: `(min-width: 600px) and (max-width: 991px)` });
export default Mobile;
