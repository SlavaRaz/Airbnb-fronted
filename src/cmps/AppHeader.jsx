import { Link, NavLink } from 'react-router-dom'
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

	// async function onLogout() {
	// 	try {
	// 		await logout()
	// 		navigate('/')
	// 		showSuccessMsg(`Bye now`)
	// 	} catch (err) {
	// 		showErrorMsg('Cannot logout')
	// 	}
	// }

	return (
			<div className="app-header ">
				<div className="header-logo">
					<NavLink to="/" >
						<img src={logo} alt="Logo" />
					</NavLink>
					<h2 className="logo-text">airbnb</h2>
				</div>
				{/* <div className='search-bar'> */}
					<SearchBar />
				{/* </div> */}
					<NavMenu />			
			</div >
		)
}
