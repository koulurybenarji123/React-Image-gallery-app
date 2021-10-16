import classes from './UserProfile.module.css';
import ProfileDetail from './ProfileDetail';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
const UserProfile = () =>
{
  const authcontext=useContext(AuthContext);
  const isloggedin=authcontext.isLoggedin;
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      {isloggedin && <ProfileDetail/>}
      </section>
  );
};

export default UserProfile;
