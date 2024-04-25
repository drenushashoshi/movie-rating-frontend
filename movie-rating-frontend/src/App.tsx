import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import  Navbar  from './components/navbar'
import './App.css'
import { Register } from "./pages/auth/register";
import { Login } from "./pages/auth/login";
import {MovieList} from "./pages/Home/index";
import RatedPage from "./pages/Ratings/ratings";
import MovieDetail from "./pages/Home/MovieDetails";

function App(){
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<MovieList/>}/>
          <Route path="/movie/:movieTitle" element={<MovieDetail/>}/>
          <Route path="/auth" element={<Register/>}/>
          <Route path="/auth/Login" element={<Login/>}/>
          <Route path="/ratings" element={<RatedPage/>}/>
        </Routes>
      </Router>
    </div>

);
}
  
export default App