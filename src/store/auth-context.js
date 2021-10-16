import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedin: false,
  login: (token) => {},
  logout: () => {},
  user:'',
  SetUser:(id)=>{}
});
export const AuthContextProvider = (props) => {
  const initialToken=localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const [user,setuser]=useState(null);
  const userIsLoggedIn = !!token;
  const loginHandler = (token,expirationTime) => {
    localStorage.setItem('token',token);

    setToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  const SetUser=(id)=>
  {
    setuser(id);
  }
  const contextValue = {
    token: token,
    isLoggedin: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user:user,
    SetUser:SetUser
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
