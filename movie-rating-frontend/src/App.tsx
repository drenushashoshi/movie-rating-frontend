import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navbar } from './components/navbar'
import './App.css'
import { Register } from "./pages/auth/register";
import { Login } from "./pages/auth/login";
import {MovieList} from "./pages/Home/index";
function App(){
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<MovieList/>}/>
          <Route path="/auth" element={<Register/>}/>
          <Route path="/auth/Login" element={<Login/>}/>
          <Route path="/rated" element={<h1>Rated</h1>}/>
        </Routes>
      </Router>
    </div>

);
}
  
export default App