import { Link, NavLink, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import { NavMenu } from './NavMenu.jsx'
import { logout } from '../store/actions/user.actions'
import logo from '../assets/img/various/airbnb.png'

export function MyListingsHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)

  if (location.pathname.startsWith('/book/stay')) {
    return null
  }

  return (
    <section>
      <div className={'` main-container full app-header sticky`'}>
        <div className='header-logo'>
          <NavLink to='/'>
            <img src={logo} alt='Logo' />
          </NavLink>
          <NavLink to='/'>
            <h2 className='logo-text'>TripNGo</h2>
          </NavLink>
        </div>
        <NavMenu />
      </div>
    </section>
  )
}
