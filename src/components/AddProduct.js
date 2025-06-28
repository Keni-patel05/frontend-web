import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const addProduct = async () => {
        if (!product || !price || !category || !company || !image) {
            setError(true);
            return;
        }

        const token = JSON.parse(localStorage.getItem("token"));
        const userId = JSON.parse(localStorage.getItem("user"))._id;

        const formData = new FormData();
        formData.append("product", product);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("company", company);
        formData.append("userId", userId);
        formData.append("image", image);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/add-product`, {
                method: "POST",
                body: formData,
                headers: {
                    authorization: `bearer ${token}`, // 👍 no need to store "prefix" separately
                },
            });

            const result = await response.json();
            console.log("Upload success:", result);

            alert("Product Added Successfully");

            // Clear form
            setProduct('');
            setPrice('');
            setCategory('');
            setCompany('');
            setImage(null);
            setError(false);

            navigate('/');
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Something went wrong while uploading the product.");
        }
    };

    return (
        <div className="product">
            <h1>Add Product</h1>

            <input
                className="inputbox"
                type="text"
                placeholder="Product Name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
            />
            {error && !product && <span className="invalid">Enter Valid Name</span>}

            <input
                className="inputbox"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="invalid">Enter Valid Price</span>}

            <input
                className="inputbox"
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className="invalid">Enter Valid Category</span>}

            <input
                className="inputbox"
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className="invalid">Enter Valid Company</span>}

            <input
                className="inputbox"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {error && !image && <span className="invalid">Upload Product Image</span>}

            <button className="appButton" onClick={addProduct}>Add Product</button>
        </div>
    );
};

export default AddProduct;
