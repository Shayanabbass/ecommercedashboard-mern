import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';


const Showproducts=()=>{
   
    

    const [products, setProducts]=useState([]);
    useEffect(()=>{
        const data =async ()=>{
            let result = await fetch('http://localhost:4000/showproducts',{
                method:'GET'
            });
            result=await result.json();
            setProducts(result);
        };
        data();

    },[]);
    const deleteProduct = async (_id,productuserid) => {
        const auth= sessionStorage.getItem('userdata');
        const auth_id=JSON.parse(auth)._id;
        if(auth_id===productuserid){
        try {
            const response = await fetch(`http://localhost:4000/deleteproduct/${encodeURIComponent(_id)}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                setProducts(products.filter(product => product._id !== _id)); // Update state
                alert("Product Deleted Successfully ")
            } else {
                console.error("Failed to delete product, status:", response.status);
                const errorData = await response.json();
                console.error("Error message:", errorData.message);
            }
            
        } catch (error) {
            console.error("Request error:", error);
        }
    }
    else{
        alert("Not Authorized to delete this product");
    }
    
    
    
}



   

    return(
        <>
        <table className="table">
        <thead className="thead-dark">
       
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Company</th>
            <th scope="col">Added By</th>
            <th scope="col">Actions</th>



            
          </tr>
        </thead>
        <tbody>
        {products.map((product,index)=>(
            <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.company}</td>
            <td>{product.Added_by}</td>
            <td><button type="button" className="btn btn-danger" onClick={() => deleteProduct(product._id,product.user_id)}>Delete</button>            
            <button  type="button" className="btn btn-warning" onClick={() => deleteProduct(product._id,product.user_id)}>Update</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Open modal for @getbootstrap</button>

            </td>


          </tr>

        ))}
          
          
        </tbody>
      </table>  
      </>      
    )
}
export default Showproducts;