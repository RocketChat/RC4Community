import { FaUser } from "react-icons/fa";

export function NoUserAvatar({size,name}){
    const char = name ? name.charAt(0) : null;
    return (
        <div 
            className="d-flex justify-content-center align-items-center text-capitalize"
            style={{
                width: `${size}px`, 
                height: `${size}px`, 
                background: "#dee2e6",
                borderRadius: "50%"
            }}>
            {
                char ?
                <span style={{fontSize: `${size*0.65}px`}}>{char}</span>
                :
                <FaUser size={`${size*0.45}px`}/>
            }
        </div>
    )
}
