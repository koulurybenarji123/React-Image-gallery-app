import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';
const MainNavigation = () => {
  const authcontext=useContext(AuthContext);
  const isLoggedin=authcontext.isLoggedin;
  const logoutHandler=()=>
  {
    authcontext.logout();
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>HELLO</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            </li>
          {!isLoggedin && <li>
            <Link to='/auth'>Login</Link>
          </li>
          }
          {isLoggedin && <li>
            <Link to='/profile'>Profile</Link>
          </li>
          }
          {isLoggedin && <li>
            <Link to='/upload'>UploadImage</Link>
          </li>
          }
          {isLoggedin &&
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
