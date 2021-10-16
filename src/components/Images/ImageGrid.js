import useFirestore from "../hooks/useFirestore";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import {motion} from'framer-motion';
const ImageGrid=({setSelectedImg})=>
{
    const {docs,Loading}=useFirestore('images');
    const authcontext=useContext(AuthContext);
    const user=authcontext.user;
    return(
        <div className="img-grid">
                  {Loading && <div className="container"><div className="spinner"></div></div>}
                  {!Loading && docs && docs.map(doc=>
                  <motion.div className="img-wrap" key={doc.id} onClick={()=>setSelectedImg(doc.url)}
                  whileHover={{opacity:1}}
                  layout
                  >
                    {doc.user===user && <motion.img src={doc.url} alt="uploaded pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}/>}
                  </motion.div>
                    )}
        </div> 
    );
}
export default ImageGrid;