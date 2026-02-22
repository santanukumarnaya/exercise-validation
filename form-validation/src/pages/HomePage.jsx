import { useNavigate, useLocation } from "react-router-dom";
import Validation from "./Validation";
export default function HomePage(){
    const navigate = useNavigate();
return(
    <div>
        <button onClick={()=> navigate("/validation")}>Forms</button>
    </div>
)
}