import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [product, setName] = React.useState();
    const [price, setPrice] = React.useState();
    const [category, setCategory] = React.useState();   
    const [company, setCompany] = React.useState();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();            
        }, []); 
        
    const getProductDetails = async () => {
    console.warn(params);

    const token = JSON.parse(localStorage.getItem("token"));
    const prefix = "bearer"; // or "Bearer", "Token", etc.

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        headers: {
            authorization: `${prefix} ${token}`
        }
    });

    result = await result.json();
    setName(result.product);       
    setPrice(result.price); 
    setCategory(result.category);
    setCompany(result.company);
};

    const updateProduct = async () => {
    console.warn(product, price, category, company);

    const token = JSON.parse(localStorage.getItem("token"));
    const prefix = "bearer"; // or "Bearer", "Token", etc.

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: 'PUT',  
        body: JSON.stringify({ product, price, category, company }),
        headers: {
            'Content-Type': 'application/json',
            authorization: `${prefix} ${token}` // ✅ added
        },
    });

    result = await result.json();

    if (result) {
        alert("Product Updated Successfully");
        navigate('/'); 
    } 
};


    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" className="inputbox" placeholder="Enter Product Name"
            onChange={(e)=>{setName(e.target.value)}} value={product} />

            <input type="number" className="inputbox" placeholder="Enter Product Price"
            onChange={(e)=>{setPrice(e.target.value)}} value={price} />

            <input type="text"  className="inputbox" placeholder="Enter Product Category"
             onChange={(e)=>{setCategory(e.target.value)}} value={category} />
             
            <input type="text"  className="inputbox" placeholder="Enter Product Company"
             onChange={(e)=>{setCompany(e.target.value)}} value={company} />

            <button type="submit" onClick={updateProduct} className="appButton">Update Product</button>
        </div>
    );
};

export default UpdateProduct;
