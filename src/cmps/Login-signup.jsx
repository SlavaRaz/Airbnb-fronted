import { useState, useEffect } from 'react'
import { userService } from '../services/user/index.js'
import { ImgUploader } from '../cmps/ImgUploader.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, signup } from '../store/actions/user.actions.js'
import { BtnSquareColor } from './ui/buttons/btn-square-color'
import { BtnSquare } from './ui/buttons/btn-square'
import { BtnSquareBlack } from './ui/buttons/btn-square-black'
import { BtnNavRounded } from './ui/buttons/btn-nav-rounded'

export function LoginSignup({ closeModal }) {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  });
  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const users = await userService.getUsers();
    setUsers(users);
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' });
    setIsSignup(false);
  }

  function handleChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  }

  async function onLogin(ev = null) {
    if (ev) ev.preventDefault();

    if (!credentials.username) {
      showErrorMsg('Please enter a username');
      return;
    }

    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome: ${user.fullname}`);
      closeModal();
    } catch (err) {
      showErrorMsg('Cannot login');
    }
    clearState();
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.fullname) return;

    if (!credentials.imgUrl) {
      credentials.imgUrl = 'https://robohash.org/mat.png?size=50x50&set=set1';
    }
    signup(credentials);
    clearState();
  }

  function toggleSignup() {
    setIsSignup(!isSignup);
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl });
  }

  function loginAsGuest() {
    setCredentials({ username: 'guest', password: '12345' }); // Demo guest credentials
    onLogin();
  }

  return (
    
    <div className="login-page">
      <header className="login-signup-header">
        <h1>Login or Sign up</h1>
      </header>
      {!isSignup && (
        <form className="login-form" onSubmit={onLogin}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <BtnSquareColor>
            Log in
          </BtnSquareColor>
        </form>
      )}
        <BtnSquare className="demo-login-btn" onClick={loginAsGuest}>
          Log in as Guest
        </BtnSquare>
     
      <div className="signup-section">
        {isSignup && (
          <form className="signup-form" onSubmit={onSignup}>
            <input
              type="text"
              name="fullname"
              value={credentials.fullname}
              placeholder="Fullname"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              value={credentials.username}
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <ImgUploader onUploaded={onUploaded} />
            <button>Signup!</button>
          </form>
        )}
      </div>
      <div className="sign-up-btn-container">
        <BtnNavRounded className="btn-link" onClick={toggleSignup}>
          {!isSignup ? 'Signup' : 'Login'}
        </BtnNavRounded>
      </div>
    </div>
  );
}
