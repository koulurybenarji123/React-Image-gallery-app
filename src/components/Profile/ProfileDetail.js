import classes from './ProfileDetail.module.css';
import AuthContext from '../../store/auth-context';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
const ProfileDetail=()=>
{
    const [email,setEmail]=useState('');
    const [date,setDate]=useState('');
    const [Loading,setLoading]=useState(true);
    const authcontext=useContext(AuthContext);
    const isloggedin=authcontext.isLoggedin;
    const token=authcontext.token;

    let url='https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDnPZb5PmE9ptInQI-JL6PwE4Jcb1SWQ_8';
    useEffect(()=>{
    let seconds,dateObj;
    axios.post(url,{
        idToken:token   
    })
    .then(response=>
        {
            setEmail(response.data.users[0].email);
            seconds=parseInt(response.data.users[0].createdAt);
           
            dateObj=new Date(seconds);
            setDate(dateObj.toLocaleDateString());
            authcontext.SetUser(response.data.users[0].localId);
            setLoading(false);
        })
    .catch(error=>
        {
            console.log(error);

        })    
 
   },[url])
   const Profile=<div className="web-container">
   <div  className={classes.card}>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLtdifYeywRo54PEZid8SrOliHnblV4GNEQ&usqp=CAU" alt="images" className={classes.avatar}/>
           <div >Email
           <div className={classes.email}>{email}</div>
           </div>
           <div>
           Account Created at
           </div>
           <div className={classes.date}>
               {date}
           </div>
           <Link to="passwordChange" className={classes.btn1}>Change Password</Link>

           {isloggedin && <Link to="/deleteAccount" ><button className={classes.delete}> Delete Account</button></Link>}
   </div>
   </div>;
   
    return(
        <div>
        { Loading && <div className="spinner"></div>}
        {!Loading && Profile}
        </div>    
    );
}
export default ProfileDetail;