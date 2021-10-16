import { useEffect,useState } from "react";
import { Projectstorage,Projectfirestore,timestamp} from "../../firebase/config";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const useStorage=(file)=>
{
    const authcontext=useContext(AuthContext);
    const token=authcontext.token;
    const user=authcontext.user;
    const [url,setUrl]=useState(null);
    const [error,seterror]=useState(null);
    const [progress,setprogress]=useState(0);
    useEffect(()=>{
        const storageRef=Projectstorage.ref(`images/${file.name}`);
        const collectionRef=Projectfirestore.collection('images');
        storageRef.put(file).on('state_changed',
        (snap)=>{
            let percentage=(snap.bytesTransferred/snap.totalBytes)*100;
            setprogress(percentage);
        },
        (err)=>{seterror(err);},
        async()=>
        {
            const url=await storageRef.getDownloadURL();
            const createdAt=timestamp();
            await collectionRef.add({url,createdAt,user});
            setUrl(url);
        });
    },[file,token,user])
        
    return {progress,url,error};
}
export default useStorage;