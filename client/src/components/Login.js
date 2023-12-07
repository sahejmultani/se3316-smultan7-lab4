//login page 

//ABLE TO LOGIN WITHOUT ENTERING PASSWORD IF EMAIL EXISTS FIX THISSSSSSSSS



import '../styling/Login.css'
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history=useNavigate();

    const [userName, setUserName] = useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/login",{
                email,password
            })
            .then(res=>{
            
                if(res.data=="exist"){
                    const name = res.data.name;
                    setUserName(name);
                    history("/home",{state:{id:userName}})
                }
                
                else if(res.data=="notexist"){
                    alert("User has not signed up")
                }
                else if(res.data == "Invalid password"){
                    alert("Invalid password")
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

            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Signup Page</Link>
            <Link to="/">Back to guest main page </Link>

        </div>
    )
}

export default Login