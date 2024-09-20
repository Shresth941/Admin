import "./navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Storecontext} from '../../Context/storecontext'


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { token, setToken } = useContext(Storecontext);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />

     
      <div className="navbar-right">
       
      
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign_in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-ptofile-dropdown">
              
              <li className="down"onClick={logout}>
                <img src={assets.logout_icon} alt="" /> <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
