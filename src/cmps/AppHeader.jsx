import { Link, NavLink, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { SearchBar } from './SearchBar.jsx'
import { NavMenu } from './NavMenu.jsx'
import { logout } from '../store/actions/user.actions'
import logo from '../assets/img/various/airbnb.png'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const location = useLocation()

	const isStickyPage = location.pathname === '/'
	const isStayPage = location.pathname.startsWith('/stay')

	if (location.pathname.startsWith('/book/stay')) {
		return null
	}

	return (
		<div className="full main-container">
			<div className={isStayPage ? ' main-container-details' : 'full main-container'}>
				<div className={isStickyPage ? 'app-header sticky' : 'app-header'}>
					<div className="header-logo">
						<NavLink to="/" >
							<img src={logo} alt="Logo" />
						</NavLink>
						<NavLink to="/" >
							<h2 className="logo-text">airbnb</h2>
						</NavLink>
						{/* <nav>
					<a href="/"></a>
					<a href="/stay"></a>
				</nav> */}
					</div>
					<SearchBar />
					<NavMenu />
				</div >
			</div>
		</div>
	)
}
