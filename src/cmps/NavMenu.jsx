import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import guest from '../assets/img/guest.svg'
import useClickOutside from '../customHooks/useClickOutside.js'
import { useModal } from '../customHooks/UseModal.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from './Login-signup.jsx'
import { NavHamburger } from './ui/Nav-hamburger.jsx'

export function NavMenu() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const notifications = useSelector(
    (storeState) => storeState.userModule.notifications
  )

  async function onLogout() {
    try {
      await logout()
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function onAddStay() {
    navigate('/new-stay')
  }

  const [navbarOpen, setNavbarOpen] = useState(false)
  const { closeModal, openModal, Modal } = useModal()
  const elNav = useRef()

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev)
  }

  useClickOutside(elNav, () => {
    if (navbarOpen) setNavbarOpen(false)
  })

  return (
    <section>
      <Modal />
      <nav className='nav-menu' onClick={handleToggle} ref={elNav}>
        {notifications.length > 0 && (
          <div className='notificaiton-badge'>{notifications.length}</div>
        )}
        <div className='menu-btn'>
          <NavHamburger />
          <div className='menu-avatar'>
            {user?.imgUrl ? (
              <img src={user.imgUrl} alt={user.fullname} />
            ) : (
              <img src={guest} alt='' />
            )}
          </div>
        </div>
        {navbarOpen &&
          (!user ? (
            <div className='menu-links'>
              <Link
                onClick={() =>
                  openModal(<LoginSignup closeModal={closeModal} />)
                }
              >
                Log in
              </Link>
            </div>
          ) : (
            <div className='menu-links'>
              <Link to='/mytrips'>My Trips</Link>
              <Link to='/hosting/mylistings'>My Listings</Link>
              <Link to='/hosting/new-stay'>Add New Stay</Link>

              <button
                style={{ borderTop: `1px solid hsl(0, 0%, 87%)` }}
                onClick={onLogout}
              >
                Log out
              </button>
            </div>
          ))}
      </nav>
    </section>
  )
}
