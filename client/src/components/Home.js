//authorized user home page

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