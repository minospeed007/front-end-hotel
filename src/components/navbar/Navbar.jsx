import "./navbar.css"
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/authContext'
import {useContext} from 'react'
const Navbar = () => {
  const {user}=useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/'>
        <span className="logo">TourPlanet</span>
        </Link>
        
       <section className="username" >{user ? user.username : (<div className="navItems">
         <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>)}</section> 
      </div>
    </div>
  )
}

export default Navbar