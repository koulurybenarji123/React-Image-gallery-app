import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from './DeleteAccount.module.css';
import { useEffect } from "react";
const DeleteAccount=()=>
{
    const [delStatus,setdelStatus]=useState(false);
    const authcontext=useContext(AuthContext);
    const token=authcontext.token;
    const url='https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDnPZb5PmE9ptInQI-JL6PwE4Jcb1SWQ_8';
   useEffect(()=>{
    axios.post(url,{
        idToken:token
    }).then((res)=>
    {
        if(res.status===200)
        {
             setdelStatus(true); 
             localStorage.removeItem('token');
             authcontext.logout();
        }
    })
    .catch(error=>
     {
         console.log(error);
     })
   },[])
   
   return(
       <div>
          {delStatus && <p>Successfully deleted</p>}
          {!delStatus && <div className={classes.loader}></div>}
       </div>
   );
}
export default DeleteAccount;