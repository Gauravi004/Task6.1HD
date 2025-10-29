import { FaStar } from "react-icons/fa";
function Tutorials(props){
    return(
        <div>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>                                                              
            <p>{props.username}</p>
             <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px" }}>
                             <FaStar style={{ color: "gold", fontSize: "14px" }} />
                             {props.rating}
                           </span>
        </div>
    )

}

export default Tutorials;