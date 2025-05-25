import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Perfumes from './Components/Perfumes';
import ProductDetails from './Components/ProductDetails';
import CartPage from './Components/Cart';
import About from './Components/About';
import Contact from './Components/Contact';


function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
}
function App() {
   return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/perfumes" element={<Perfumes/>}/>
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      

    </Routes>
  );
}

export default App;
