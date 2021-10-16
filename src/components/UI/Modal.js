const Modal=({selectedImg,setSelectedImg})=>
{
    const handleClick=(e)=>
    {
        if(e.target.classList.contains('backdrop'))
        {
        setSelectedImg(null);
        }
    }
    return(
        <div className="backdrop" onClick={handleClick}>
               <img src={selectedImg} alt="enlarged-img"/>
        </div>
    );
}
export default Modal;