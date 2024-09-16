import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Showproducts = () => {
    const [show, setShow] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = (product) =>
    { 
        setCurrentProduct(product);
        setShow(true);



    }
    

    useEffect(() => {
        const fetchData = async () => {
            let result = await fetch('http://localhost:4000/showproducts', {
                method: 'GET'
            });
            result = await result.json();
            setProducts(result);
        };
        fetchData();
    }, []);

    const deleteProduct = async (_id, productuserid) => {
        const auth = sessionStorage.getItem('userdata');
        const auth_id = JSON.parse(auth)._id;
        if (auth_id === productuserid) {
            try {
                const response = await fetch(`http://localhost:4000/deleteproduct/${encodeURIComponent(_id)}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setProducts(products.filter(product => product._id !== _id)); // Update state
                    alert("Product Deleted Successfully ");
                } else {
                    console.error("Failed to delete product, status:", response.status);
                    const errorData = await response.json();
                    console.error("Error message:", errorData.message);
                }
            } catch (error) {
                console.error("Request error:", error);
            }
        } else {
            alert("Not Authorized to delete this product");
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        const auth = sessionStorage.getItem('userdata');
        const auth_id = JSON.parse(auth)._id;
    
        if (auth_id === currentProduct.user_id) {
            try {
                const response = await fetch(`http://localhost:4000/updateproduct/${encodeURIComponent(currentProduct._id)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: currentProduct.name,
                        price: currentProduct.price,
                        category: currentProduct.category,
                        company: currentProduct.company
                    }),
                });
    
                if (response.ok) {
                    alert("Product Updated Successfully");
                    handleClose(); // Close the modal
                    setProducts((prevProducts) => prevProducts.map(
                        (product) => product._id === currentProduct._id ? currentProduct : product
                    )); // Update the product list with the updated product
                } else {
                    console.error("Failed to update product, status:", response.status);
                    const errorData = await response.json();
                    console.error("Error message:", errorData.message);
                }
            } catch (error) {
                console.error("Request error:", error);
            }
        } else {
            alert("Not Authorized to update this product");
        }
    };

    // Handle opening the modal and setting the recipient
    

    return (
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
                    {products.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.company}</td>
                            <td>{product.Added_by}</td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product._id, product.user_id)}>Delete</button>
                                <Button className="mx-3" variant="warning" onClick={() => handleShow(product)}>Update</Button>
                     
                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {currentProduct && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product: {currentProduct.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.name}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productCategory">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.category}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productCompany">
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.company}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, company: e.target.value })}
                                />
                            </Form.Group>
                            {/* Add other form fields as necessary */}
                            <Button variant="primary" type="submit" onClick={(e) => handleUpdate(e)}>
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}

           
        </>
    );
};

export default Showproducts;
