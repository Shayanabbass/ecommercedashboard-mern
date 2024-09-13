import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {  useNavigate } from "react-router-dom";


const Login = () => {
    const navigate=useNavigate();
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const data=async ()=>{
       if (email===""){
            alert("Please enter the Email");
            
        }
        else if(password===""){
            alert("Please enter the Email");
        }
        else{
        let result= await fetch('http://localhost:4000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },

        });
    

        if(result.status===200){
            result=await result.json();
            console.log(result);
            const[messageobj,userobj,tokenobj]=result;
            console.log(userobj.user.username);
            
            
            
           
            alert(messageobj.message);
            sessionStorage.setItem('userdata',JSON.stringify(userobj.user));
            sessionStorage.setItem('token',JSON.stringify(tokenobj.token));
            navigate('/');
        }   
        else if(result.status===400){
            alert("User Not Exsist");

        }
        else if(result.status===401){
            alert("Password Not Match");

        }
    }
}


    

    // const responseMessage = (response) => {
    //     console.log(response);
    // };

    // const errorMessage = (error) => {
    //     console.log(error);
    // };

    return (
        <div className="container mt-5 signup">
            <div className="text-center mb-4 heading">
                <h1>Login</h1>
            </div>
            <div className="form">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <input type="email" className="form-control mb-3" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <button onClick={data} className="btn w-100 register-button">Login</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Login;
