//authorized user home page

/* WHAT THIS NEEDS (SAME AS UNAUTHHOME BUT ALSO NEEDS):
allow user to create up to 20 named lists
show full info of lists
ability to edit the lists
delete a list
add a review to a list (others list)
LOGOUT BUTTON

----------ADMIN
special user for admin access
ability to grant admin privilege to one or more users
ability to mark a review as hidden
ability to mark a user as deactivated

---------SEPERATE DOC?
Administrator functionality related to copyright enforcement:
*/

import '../styling/Home.css'
import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';

function Home (){
    const location=useLocation()

    return (
        <div className="homepage">

            <h1>Welcome to your dashboard {location.state.id}!</h1>
            <p>Explore Superhero info</p>

        </div>
    )
}

export default Home