import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//import Count from './components/counter/Count'
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./components/login/login";
import Register from "./components/register/register";
import MailList from "./components/mailList/MailList";
import Footer from "./components/footer/Footer";
import FlightSearch from "./pages/flight/flight";
import FlightList from "./pages/flight/flight_list";

const App=()=> {
  return (
    <BrowserRouter>
    <div className="app-div">
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/search_flight" element={<FlightSearch/>}/>
        <Route path="/list_flight" element={<FlightList/>}/>


        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
      </Routes>
      <Footer/>
      <MailList/>

      </div>
    </BrowserRouter>
  );
}

export default App;
