import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.svg'

const Menu = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        
        <Link to="/" className="navbar-brand"><img src={Logo} width="30" height="30" alt=""/> Rock Paper Scissors</Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/game">Game</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ranking">Ranking</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/config">Configuration</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu
