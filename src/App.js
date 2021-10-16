import { Switch, Route } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Suspense } from 'react';
import { Redirect } from 'react-router';
import AuthContext from './store/auth-context';
import Spinner from './components/UI/Spinner';
import Layout from './components/Layout/Layout';
const AuthPage=React.lazy(()=>import('./pages/AuthPage'));
const  UserProfile=React.lazy(()=>import('./components/Profile/UserProfile'));
const ProfileForm=React.lazy(()=>import('./components/Profile/ProfileForm'));
const HomePage=React.lazy(()=>import('./pages/HomePage'));
const DeleteAccount=React.lazy(()=>import('./components/Profile/DeleteAccount'));
const UploadImage=React.lazy(()=>import('./components/Images/UploadImage'));
const ImageGrid=React.lazy(()=>import('./components/Images/ImageGrid'));
const Modal=React.lazy(()=>import('./components/UI/Modal'));
const LoadUser=React.lazy(()=>import('./components/StartingPage/LoadUser'));

function App() {
  const authCtx=useContext(AuthContext);
  const [selectedimg,setselectedimg]=useState(null);
 
  return (
    <Layout>
      <Suspense fallback={<Spinner/>}>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        { !authCtx.isLoggedin && <Route path='/auth'>
          <AuthPage />
        </Route>
        }
        <Route path='/profile'>
        {authCtx.isLoggedin && <UserProfile />}
        {!authCtx.isLoggedin && <Redirect to="/auth"/>}
        </Route>
        {authCtx.isLoggedin &&<Route path="/passwordChange"><ProfileForm/>
          </Route>}
          {authCtx.isLoggedin &&<Route path="/deleteAccount"><DeleteAccount/>
          </Route>}
         {authCtx.isLoggedin &&<Route path='/upload'><UploadImage/>
         {authCtx.isLoggedin && <LoadUser/>}
          {authCtx.isLoggedin && <ImageGrid setSelectedImg={setselectedimg}/>}
          {authCtx.isLoggedin && selectedimg && <Modal selectedImg={selectedimg} setSelectedImg={setselectedimg}/>}
           </Route>}
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
