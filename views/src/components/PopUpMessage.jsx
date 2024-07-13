import { useNavigate } from "react-router-dom";

export default function PopUpMessage(props) {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/Login")
    }
  return (
    <div className="popUp">
      <span>{props.message}</span>
      <button className="popUp-btn" onClick={handleClick}>Login</button>
    </div>
  );
}
