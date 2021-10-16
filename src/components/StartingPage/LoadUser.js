import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import { useEffect } from 'react';
const LoadUser=()=>
{
    const authCtx=useContext(AuthContext);
    const token=authCtx.token;
    let url='https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDnPZb5PmE9ptInQI-JL6PwE4Jcb1SWQ_8';
    useEffect(()=>{
     axios.post(url,{
       idToken:token   
       })
       .then(response=>
         {
           authCtx.SetUser(response.data.users[0].localId);
         })
    },[])
    return(
        <div>
            
        </div>
    );
}
export default LoadUser;