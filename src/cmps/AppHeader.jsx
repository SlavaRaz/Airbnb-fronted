import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import logo from '../assets/img/various/airbnb.png'
import { SearchBar } from './SearchBar.jsx'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<div className="app-header ">
			<div className="header-logo">
				<NavLink to="/" >
					<img src={logo} alt="Logo" />
				</NavLink>
				<h2 className="logo-text">airbnb</h2>
			</div>
				{/* <NavLink to="stay">Stays</NavLink> */}
			{/* <NavLink to="about">About</NavLink>
				<NavLink to="chat">Chat</NavLink>
				<NavLink to="review">Review</NavLink> */}
			<div className='app-header search-bar'>
				<SearchBar />
			</div>
			{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

			{!user && <NavLink to="login" className="login-link">Login</NavLink>}
			{
				user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{/* {user.imgUrl && <img src={user.imgUrl} />} */}
							{user.fullname}
						</Link>
						{/* <span className="score">{user.score?.toLocaleString()}</span> */}
						<button onClick={onLogout}>logout</button>
					</div>
				)
			}
		</div >
	)
}
