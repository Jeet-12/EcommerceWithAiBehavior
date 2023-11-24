
import './styles/Register.css';
import Register from './Component/Register';
import { Routes,Route } from 'react-router-dom'
import HomePage from './Component/HomePage';
import Login from './Component/Login';
import MyProfile from './Component/MyProfile';
import AddProduct from './Component/seller/AddProduct';
import AllProduct from './Products Section/AllProduct';
import ProductsDetails from './Products Section/ProductsDetails';
import ShowCarts from './Component/ShowCarts';


function App() {

  return(
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<MyProfile/>}/>
      <Route path="/addProduct" element={<AddProduct/>}/>
      <Route path="/allProduct/mobile" element={<AllProduct type={"Mobile"}/>}/>
      <Route path="/allProduct/laptop" element={<AllProduct type={"Laptop"}/>}/>
      <Route path="/allProduct/tv" element={<AllProduct type={"Tv"}/>}/>
      <Route path="/allProduct/shoes" element={<AllProduct type={"Shoes"}/>}/>
      <Route path="/products/:id/:type" element={<ProductsDetails/>}/>
      <Route path="/carts" element={<ShowCarts/>}/>

     
    </Routes>
    </>
  );
}

export default App;
