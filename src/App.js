import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/Sign-Up';
import PrivateCom from './components/PrivateCom';
import Login from './components/Login';
import AddProduct from './components/AddProduct';   
import ProductList from './components/ProductList';  
import UpdateProduct from './components/UpdateCom'; 

function App() { 
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateCom />}>
        <Route path="/" element={<ProductList/>} />
        <Route path="/add" element={<h1><AddProduct /></h1>} />
        <Route path="/update/:id" element={<h1><UpdateProduct/></h1>} />
        <Route path="/logout" element={<h1>Logout Componenet</h1>} />
        <Route path="/profile" element={<h1>Profile Componenet</h1>} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
