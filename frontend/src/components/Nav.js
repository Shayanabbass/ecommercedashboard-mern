import React, { } from 'react';
import {Link , useNavigate} from 'react-router-dom';

const Nav=()=>{
    const navigate=useNavigate();
    const auth= sessionStorage.getItem('userdata');
    const auth2= sessionStorage.getItem('token');

    const Logout=()=>{
        sessionStorage.clear();
        navigate('/signup');
    }
    return(
        <div>
        { auth2? <ul className='list'>
            <Link to="/otp"></Link>
            

           <li> <Link to="/">Products</Link></li>
           <li> <Link to="/addproduct">Add Products</Link></li>
           <li> <Link to="/update">Update Products</Link></li>
           
           <li> <Link to="/profile">Profile</Link></li>
           <li> <Link to="/login" onClick={Logout}>Logout ({JSON.parse(auth).username})</Link> </li> 
          



        </ul>
        :
        <ul className='list second-list'>
        <li> <Link to="/signup">Signup</Link></li> 

        <li><Link to="/login">Login</Link></li>
        </ul>
} 
        </div>
    )
}

export default Nav;