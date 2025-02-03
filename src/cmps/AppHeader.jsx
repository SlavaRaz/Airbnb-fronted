import { Link, NavLink, useLocation } from 'react-router-dom'
import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
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
        <section>
            {isStayPage ? (
                <div className="details-header-container">
                    <div className={`app-header ${isStickyPage ? 'sticky' : ''}`}>
                        <div className="header-logo">
                            <NavLink to="/" >
                                <img src={logo} alt="Logo" />
                            </NavLink>
                            <NavLink to="/" >
                                <h2 className="logo-text">TripNGo</h2>
                            </NavLink>
                        </div>
                        <SearchBar />
                        <NavMenu />
                    </div>
                </div>
            ) : (
                <div className={`full ${isStayPage ? 'main-container-details' : 'main-container'} app-header ${isStickyPage ? 'sticky' : ''}`}>
                    <div className="header-logo">
                        <NavLink to="/" >
                            <img src={logo} alt="Logo" />
                        </NavLink>
                        <NavLink to="/" >
                            <h2 className="logo-text">TripNGo</h2>
                        </NavLink>
                    </div>
                    <SearchBar />
                    <NavMenu />
                </div>
            )}
        </section>
    );
}
