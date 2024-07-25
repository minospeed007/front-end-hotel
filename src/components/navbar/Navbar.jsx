import "./navbar.css";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

const Navbar = () => {
  const { user, dispatch} = useContext(AuthContext);
  const location = useLocation(); 
  const navigate=useNavigate();
  const isRegisterPage = location.pathname === '/register';
  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem('user'); 
    navigate('/login');  
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/'>
          <span className="logo">TourPlanet</span>
        </Link>
        
        <section className="username">
       { user ? (
    <div className="name-text">
      <p>{user.name}</p>
      <button onClick={handleLogout} className="navButton">Logout</button>
      </div>
  )  : (
            <div className="navItems">
              {!isRegisterPage && <Link to='/register'>
              <button className="navButton">Register</button>
              </Link>
              }
              {!isLoginPage &&<Link to='/login'>
               <button className="navButton">Login</button>
               </Link>
               }
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Navbar;
