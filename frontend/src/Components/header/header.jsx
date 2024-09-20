import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [menu, setMenu] = useState("Home");

  return (
    <div className='navbar1'>
      <ul className="navbar-menu">
        <Link
          to="/list"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/list"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Employee List
        </Link>
        <Link
          to="/list"
          onClick={() => setMenu("Mobile App")}
          className={menu === "Mobile App" ? "active" : ""}
        >
          Name
        </Link>
      </ul>
      <input
        type="search"
        className="form-control"
        placeholder="Search..."
        aria-label="Search"
      />
    </div>
  );
};

export default Header;
