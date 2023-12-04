//homepage for initial startup and to login/register


/* WHAT THIS NEEDS
JWT TOKENSSS

email verfication for new account
what the site is about and login button
interface to search superheros (original result must just be heroname and publisher and then expand button to show eevyrthing)
each search result needs a link to duckduckgo search
keywords are softmatched

*/


import React from "react"
import {Link} from 'react-router-dom';
import '../styling/UnauthHome.css'


function UnauthHome (){

    return (
        <div className="inital">
            <div className="unAuthHomepage">
                <h1>Superhero App</h1>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>

                <div className="about-app">
                    <h3>About the App</h3>
                    <p>Welcome to my superhero app! Here you are able to search through all of your favourite superheroes 
                        and check out all of their information. See one that you like? Signup and login to save them to your personal lists
                        and leave reviews for others!</p>
                </div>
            </div>

            <form className="search">
                <input type="text" placeholder="Search by Name" />
                <button type="submit">Search</button>
                <input type="text" placeholder="Search by Race" />
                <button type="submit">Search</button>
                <input type="text" placeholder="Search by Power" />
                <button type="submit">Search</button>
                <input type="text" placeholder="Search by Publisher" />
                <button type="submit">Search</button>
            </form>

            <div className="searchResults">

            </div>
        
        </div>
    )
}

export default UnauthHome