import React from "react";
import { Outlet,Navigate } from "react-router-dom";

const Privatecomponent=()=>{
    const auth=sessionStorage.getItem('user')

    return(
        auth? <Outlet/>: <Navigate to='/signup'/>
    );
}
export default Privatecomponent;