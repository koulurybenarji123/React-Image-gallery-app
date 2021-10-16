import { useState,useEffect } from "react";
import { Projectfirestore } from "../../firebase/config";
const useFirestore=(collection)=>
{
    const [docs,setDocs]=useState([]);
    const [Loading,setLoading]=useState(true);
    useEffect(()=>{
        const unsub=Projectfirestore.collection(collection)
        .orderBy('createdAt','desc')
        .onSnapshot((snap)=>
        {
            let documents=[];
            snap.forEach(doc => 
            {
               documents.push({...doc.data(),id:doc.id});    
            });
            setDocs(documents);
            setLoading(false);
        })
        return ()=>
        { 
            unsub();
        }

    },[collection]);
    
    return {docs,Loading};
}
export default useFirestore;