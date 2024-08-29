import React from "react";
import { Outlet,Navigate } from "react-router-dom";

export const Privatecomponent=()=>{
    const auth=sessionStorage.getItem('user')

    return(
        auth? <Outlet/>: <Navigate to='/signup'/>
    );
}
export const Signupprivate=()=>{
    const auth=sessionStorage.getItem('user')
    return(
        auth? <Navigate to='/'/>: <Outlet/>
    );


}
