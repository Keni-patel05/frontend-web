import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user")); // 👈 Get user data

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const prefix = "bearer";

        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `${prefix} ${token}`
            }
        });

        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        const token = JSON.parse(localStorage.getItem("token"));
        const prefix = "bearer";

        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `${prefix} ${token}`
                }
            });

            result = await result.json();
            setProducts(result);
        } else {
            getProducts();
        }
    };

    return (
        <div className="product-list">
            <h3>Product List</h3>

            {!user?.isAdmin && (
                <marquee style={{
                    backgroundColor: "#e0f7fa",
                    color: "#00796b",
                    fontWeight: "bold",
                    padding: "10px",
                    marginBottom: "20px"
                }}>
                    🛒 List more products now — more products means more visibility!                
                </marquee>
            )}

            <input
                type="text"
                className="search"
                placeholder="Search Product"
                onChange={searchHandle}
            />

            <div className="product-table">
                <div className="product-row header">
                    <div>S.No.</div>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Category</div>
                    <div>Image</div>
                    <div>Operation</div>
                </div>
                {
                    products.length > 0 ? products.map((item, index) => (
                        <div className="product-row" key={item._id}>
                            <div>{index + 1}</div>
                            <div>{item.product}</div>
                            <div>{item.price}</div>
                            <div>{item.category}</div>
                            <div>
                                {item.image &&
                                    <img
                                        src={`http://localhost:5000/uploads/${item.image}`}
                                        alt="product"
                                        width="50"
                                        height="50"
                                        style={{ objectFit: "cover" }}
                                    />
                                }
                            </div>
                            <div>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id}>Update</Link>
                            </div>
                        </div>
                    )) : <h1>No Products Found</h1>
                }
            </div>
        </div>
    );
};

export default ProductList;
