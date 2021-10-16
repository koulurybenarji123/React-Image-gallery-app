import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
const ProfileForm = () => {
  const authcontext = useContext(AuthContext);
  const newPasswordRef = useRef();
  const history=useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = newPasswordRef.current.value;
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDnPZb5PmE9ptInQI-JL6PwE4Jcb1SWQ_8',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authcontext.token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        history.replace('/');
      })
    
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
