import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import {  useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { clearuserdetails } from "../actions/userActions";


const Otp=()=>{
    const [otp,setOtp]=useState("");
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { email, password } = useSelector((state) => state.user);
    const verifyotp=async ()=>{
    if(otp===""){
        alert("please enter OTP");
    }
    let result=await fetch('http://localhost:4000/verifyotp',{
        method:'POST',
        body:JSON.stringify({email,password,otp}),
        headers:{
            'Content-Type':'application/json',
        },

    })
    if (result.status===200){
        result=await result.json();
        console.log(result);
        
        alert("User Registered Successfully");        
        sessionStorage.setItem('user',JSON.stringify(result))


        dispatch((clearuserdetails));
        

        navigate('/login');
    }
    else if(result.status===400){
        alert("User Not Found");
    }
    else if(result.status===401){
        alert("Invalid or expired OTP");
    }
    }

    return(
    <div className="container mt-5 signup">
            <div className="text-center mb-4 heading">
                <h1>Verify Your Email</h1>
            </div>
            <div className="form">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <input type="text" className="form-control mb-3" placeholder="Please Enter the OTP sent to your email" value={otp} onChange={(e)=>setOtp(e.target.value)} />
                        <button onClick={verifyotp}  className="btn w-100 register-button">Verify</button>
                    </div>
                </div>
                
            </div>
    </div>

    );
}
export default Otp;