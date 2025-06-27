import react from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    }

    return (
        <div>
            <img className="logo" src="https://media.istockphoto.com/id/1174549062/vector/shopping-bag-logo-design-icon-online-shop-symbol-vector-illustrations.jpg?s=612x612&w=0&k=20&c=Zgtz4Nom60--7vsHa54bkKP7waE7pQeMC0dJcggrT8k=" alt="logo" />
            {
                auth ? 
                <ul className="nav-ul"> 
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link to="/update">Update Products</Link></li>   
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to="/signup">Logout ({auth !== "undefined" ? JSON.parse(auth).name : ""})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;
