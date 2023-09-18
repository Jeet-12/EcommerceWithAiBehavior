
import './styles/Register.css';
import Register from './Component/Register';
import { Routes,Route } from 'react-router-dom'
import HomePage from './Component/HomePage';
import Login from './Component/Login';
function App() {
  return(
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
