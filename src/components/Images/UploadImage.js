import { useState } from "react";
import ProgressBar from "./ProgressBar";
import "./UploadImage.css";
const Basic=()=>
{
    const [image,setImage]=useState(null);
    const [error,seterror]=useState(null);
    const types=['image/png','image/jpeg'];
    const handleChange=(e)=>
    {
        const selected=e.target.files[0];
        if(selected && types.includes(selected.type))
        {
            setImage(selected);
            seterror('');
        }
        else
        {
            setImage(null);
            seterror('Please Select an image file(png or jpeg)');
        }
    }
    return(
        <form>
            <h2>Upload Image</h2>
            <label className="label">
            <input type="file" onChange={handleChange} className="input"/>
            <span>+</span>
            </label>
            <br/>
            {error && <div className="">{error}</div>}
            {image && <div className="">{image.name}</div>}
            {image && <ProgressBar file={image} setfile={setImage} />}
        </form>
    );
}
export default Basic;