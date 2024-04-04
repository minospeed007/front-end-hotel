import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Count from './components/counter/Count'
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List"
import Login from "./components/login/login"
import GridApp from "./grid_folder/css_grid"
const App=()=> {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/count" element={<Count/>}/>

        <Route path="/" element={<Home/>}/>
        <Route path="/grid" element={<GridApp/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
