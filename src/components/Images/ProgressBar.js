import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
const ProgressBar=({file,setfile})=>
{
    const {url,progress}=useStorage(file);
    useEffect(()=>
    {
        if(url)
        {
                    setfile(null); 
        }
    },[url,setfile]);
    return(
        <div className="progress-bar">
        <div className="progress-bar__progress" style={{width:progress+'%'}}>progress</div>
        </div>
    );
}
export default ProgressBar;