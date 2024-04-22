import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navbar } from './components/navbar'
import './App.css'
import { Register } from "./pages/auth/register";
import {MovieList} from "./pages/Home/index";
function App(){
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<MovieList/>}/>
          <Route path="/auth" element={<Register/>}/>
          <Route path="/rated" element={<h1>Rated</h1>}/>
        </Routes>
      </Router>
    </div>

);
}
  
export default App