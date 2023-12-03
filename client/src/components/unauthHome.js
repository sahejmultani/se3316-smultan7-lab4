//homepage for initial startup and to login/register

import React from "react"
import {Link} from 'react-router-dom';

function UnauthHome (){

    return (
        <div className="homepage">

            <h1>Welcome to my Superhero App</h1>
            <Link to="/signup">Signup Page</Link>
            <Link to="/login">Login Page</Link>
            
        </div>
    )
}

export default UnauthHome