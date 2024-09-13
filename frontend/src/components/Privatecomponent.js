import React from "react";
import { Outlet,Navigate } from "react-router-dom";

export const Privatecomponent=()=>{
    
    const auth2=sessionStorage.getItem('token')
    return(
        auth2?  <Outlet/> :<Navigate to='/login'/>
    );
}
export const Signupprivate=()=>{

    const auth=sessionStorage.getItem('user')
    return(
        !auth?  <Outlet/>:<Navigate to='/'/>
    );


}
export const Loginprivate=()=>{
    const auth2=sessionStorage.getItem('token')
    return(
        auth2?   <Navigate to='/'/>:<Outlet/>
    );


}