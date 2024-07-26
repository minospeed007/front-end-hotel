import {useState, useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import MailList from '../mailList/MailList';
import './login.css';

const Login=()=>{
const [credentials, setCredentials]=useState({
    username:undefined,
    password:undefined
})
const {error,loading,dispatch}=useContext(AuthContext)
const navigate=useNavigate() 
const handleChange=(e)=>{
    
    setCredentials(prev=>({...prev, [e.target.id]: e.target.value}))

}   
const handleClick= async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
     const res= await axios.post("https://planettour.onrender.com/api/auth/login",credentials)
     console.log("Response from server:", res.data);
     dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
     navigate("/")  
     console.log(res?.data?.details);
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payload: err.response.data})
    }
}

return(<>
<Navbar/>

<div className="login">
        <div className="lContainer">
        {error && <span className='errorMsg'>{error.message} </span>}

        <input type="text" placeholder='Username' id="username" onChange={handleChange} className="lInput"/>
        <input type="password" placeholder='Password' id="password" onChange={handleChange} className="lInput"/>
    <button type="btn" disabled={loading} onClick={handleClick} className="lButton">Login</button>
        </div>
        </div>
   
    
    </>)
}
export default Login