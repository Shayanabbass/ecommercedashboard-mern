import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGoogleLogin , googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate=useNavigate();
    // useEffect(()=>{
    //     const auth=sessionStorage.getItem('user');
    //     if(auth){
    //         navigate('/');
    //     }
    // })
    const [username,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const data=async ()=>{
        console.log(JSON.stringify({username,email,password}));
        let result= await fetch('http://localhost:4000/register',{
            method:'post',
            body:JSON.stringify({username,email,password}),
            headers:{
                'Content-Type':'application/json'
            },

        });

        if(result.status===200){
            result=await result.json();
            console.log(result);
            alert("User Successfully registered");
            sessionStorage.setItem('user',JSON.stringify(result))
            navigate('/');
        }   
        else if(result.status===402){
            alert("User already exsisit");

        }
        
    }
    


    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(() => {
        if (user) {
            console.log(user);
            
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // Log out function to log the user out of Google and clear the profile state
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    // const responseMessage = (response) => {
    //     console.log(response);
    // };

    // const errorMessage = (error) => {
    //     console.log(error);
    // };

    return (
        <div className="container mt-5 signup">
            <div className="text-center mb-4 heading">
                <h1>Register</h1>
            </div>
            <div className="form">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <input  type="text" className="form-control mb-3" placeholder="Full Name" value={username} onChange={(e)=>setName(e.target.value)}/>
                        <input type="email" className="form-control mb-3" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <button onClick={data} className="btn w-100 register-button">Register</button>
                    </div>
                </div>
                <div className="text-center mt-4 googlesignindata">
                  
                    {profile ? (
                        <div className="googlesignindata">
                            <img src={profile.picture} alt={profile.name} className="mb-3" />
                            <h3>User Logged in</h3>
                            <p>Name: {profile.name}</p>
                            <p>Email Address: {profile.email}</p>
                            <br />
                            <button className="btn btn-secondary" onClick={logOut}>Log out</button>
                        </div>
                    ) : (
                        <div id="gSignInWrapper" onClick={login}>
                        <div id="customBtn" class="customGPlusSignIn">
                        
                          <span class="icon"></span>
                          <span class="buttonText">Sign In</span>
                        </div>
                      </div>
                        // <button onClick={login}>Sign in with Google 🚀 </button>

                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
