import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component{
    render(){
        return <div className='content'>
            <h1>404 NOT FOUND</h1>
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}
export default NotFound;