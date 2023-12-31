//register page 

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import '../styling/Signup.css'


function Login() {
    const history=useNavigate();

    const[name, setName] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

  
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function submit(e){
        e.preventDefault();
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        try{

            await axios.post("http://localhost:8000/signup",{
                name, email,password
            })
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data ==="invalidCred"){
                    alert("Enter all fields")
                }
                else if(res.data==="notexist"){
                    history("/home",{state:{id:name}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login">

            <h1>Signup</h1>

            <form action="POST">
                <input type="name" onChange={(e) => { setName(e.target.value) }} placeholder="Name"  />
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/login">Login Page</Link>
            <Link to="/">Back to guest main page </Link>

        </div>
    )
}

export default Login