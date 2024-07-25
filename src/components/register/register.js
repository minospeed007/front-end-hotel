import {useState, useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../navbar/Navbar';

import './register.css';

const Register=()=>{
const [credentials, setCredentials]=useState({
    username: undefined,
  password: undefined,
  name: undefined,
  email: undefined,
  phone: undefined
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
     const res= await axios.post("http://localhost:5000/api/auth/register",credentials)
     dispatch({type:"LOGIN_SUCCESS", payload:res.details}) 
     navigate("/")  
     console.log(res?.data)
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
        <input type="text" placeholder='Name' id="name" onChange={handleChange} className="lInput"/>
        <input type="text" placeholder='Email' id="email" onChange={handleChange} className="lInput"/>
        <input type="tel" placeholder='Phone Number' id="phone" onChange={handleChange} className="lInput"/>

        <input type="text" placeholder='Username' id="username" onChange={handleChange} className="lInput"/>
        <input type="password" placeholder='Password' id="password" onChange={handleChange} className="lInput"/>
    <button type="btn" disabled={loading} onClick={handleClick} className="lButton">Register</button>
        </div>
        </div>
   
    
    </>)
}
export default Register;