import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
  return (
    <div className="navbar">
      {/* <Link className="navbar-brand" to="/">List</Link> */}
      <NavLink className="btn" to="/create" exact>Add new +</NavLink>
      <NavLink className="btn" to="/login" exact>Login</NavLink>
    </div>
  )
}

export default withRouter(Navbar)