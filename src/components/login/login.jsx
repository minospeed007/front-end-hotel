import {useState, useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

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
     const res= await axios.post("http://localhost:5000/api/auth/login",credentials)
     dispatch({type:"LOGIN_SUCCESS", payload:res.details}) 
     navigate("/")  
     console.log(res?.data)
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payload: err.response.data})
    }
}

return(

    <div className="login">
        <div className="lContainer">
        <input type="text" placeholder='username' id="username" onChange={handleChange} className="lInput"/>
        <input type="password" placeholder='password' id="password" onChange={handleChange} className="lInput"/>
    <button type="btn" disabled={loading} onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message} </span>}
        </div>
    </div>)
}
export default Login