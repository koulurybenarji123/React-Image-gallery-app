import { useState, useRef,useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [iserror,setisError]=useState(false);
  const [error,setError]=useState('');
  const [isaLoading, setisLoading] = useState(false);
  const authcontext=useContext(AuthContext);
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const history=useHistory();


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const FocusHandler=()=>
  {
    setisError(false);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = EmailRef.current.value;
    const enteredPassword = PasswordRef.current.value;
    setisLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnPZb5PmE9ptInQI-JL6PwE4Jcb1SWQ_8';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnPZb5PmE9ptInQI-JL6PwE4Jcb1SWQ_8';
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setisLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let ErrorMessage =data.error.message;
            if(ErrorMessage==='EMAIL_EXISTS')
            {
              ErrorMessage=ErrorMessage+' Please Login';
            }
            throw new Error(ErrorMessage);
          });
        }
      })
      .then((data) => {
        authcontext.login(data.idToken);
        history.replace('/');
      })
      .catch((error) => {
        setisError(true);
        setError(error.message)
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={EmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={PasswordRef} onFocus={FocusHandler}/>
        </div>
        {/* <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input type="firstName" id="firstName" required ref={firstNameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">last Name</label>
          <input type="lastName" id="lastName" required ref={lastNameRef} />
        </div> */}
        {iserror && <div className={classes.isa_error}>{error}</div>}
        <div className={classes.actions}>
          {!isaLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isaLoading && <div className={classes.loader}></div>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
