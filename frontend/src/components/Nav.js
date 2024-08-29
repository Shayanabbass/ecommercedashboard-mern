import React, { useEffect } from 'react';
import {Link , useNavigate} from 'react-router-dom';

const Nav=()=>{
    const navigate=useNavigate();
    const auth= sessionStorage.getItem('user');
    const Logout=()=>{
        sessionStorage.clear();
        navigate('/signup');
    }
    return(
        <ul className='list'>
           <li> <Link to="/">Products</Link></li>
           <li> <Link to="/add">Add Products</Link></li>
           <li> <Link to="/update">Update Products</Link></li>
           
           <li> <Link to="/profile">Profile</Link></li>
           <li>{auth? <Link to="/signup" onClick={Logout}>Logout</Link>:<Link to="/signup">SignUp</Link>}</li> 



        </ul>
    )
}

export default Nav;