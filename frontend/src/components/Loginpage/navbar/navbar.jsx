import React from "react";
// import { useState } from "react";
// import axios from "axios";import { Link } from "react-router-dom";
import { Link } from "react-router-dom";


import "./navbar.css"

// import Home from '../../Components/Hero/Hero'
// import logo from '../../assets/logo.png';
// import underline from '../../assets/underline.png'
// import AnchorLink from 'react-anchor-link-smooth-scroll'
// import menu_open from '../../assets/menu_open.svg'
// import menu_close from '../../assets/menu_close.svg'


const Navbar = () => {


  return (
  
    
    <div className='navbar'>
        <p>Excel Analytics</p>
        <div  className='nav-menu '>
            <Link to="/login">
              <button type="button" className="nav-connect">
                Login
              </button>
            </Link>
            <Link to="/signup">
						<button type="button" className='nav-connect'>
							Sing Up
						</button>
					</Link>
        </div>
    </div>

  )
}

export default Navbar