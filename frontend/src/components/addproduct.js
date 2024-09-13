import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Product=()=>{
    const user=sessionStorage.getItem('userdata');
    const user_id=JSON.parse(user)._id;
    const Added_by=JSON.parse(user).username;
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");

    const data=async ()=>{
       if(name===""){
        alert('Please Enter Product Name')
       }
       else if(price===""){
        alert("Please Enter Product Price");
       }
       else if(category===""){
        alert("Please Enter Product Category"); 
       }
       else if(company===""){
        alert("Please Enter Product Company")
       }
       else{
       let result =await fetch('http://localhost:4000/add-product',{
        method:'POST',
        body:JSON.stringify({name,price,category,company,Added_by,user_id}),
        headers:{
            'Content-Type':'application/json'
        },

       }) ;
       if (result.status===200){
        result=await result.json();
        console.log(result);
        alert("Product Added Successfully");
        

       }




    }
}
    

    return (
        <div className="container mt-5 signup">
            <div className="text-center mb-4 heading">
                <h1>Add Product</h1>
            </div>
            <div className="form">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <input type="text" className="form-control mb-3" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} />
                        <input type="text" className="form-control mb-3" placeholder="Product Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
                        <input type="text" className="form-control mb-3" placeholder="Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
                        <input type="text" className="form-control mb-3" placeholder="Product Company" value={company} onChange={(e)=>setCompany(e.target.value)} />

                        <button onClick={data} className="btn w-100 register-button">Add Product</button>
                    </div>
                </div>
                
            </div>
        </div>
    );



}

export default Product;