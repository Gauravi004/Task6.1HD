import { useNavigate } from "react-router-dom";
import "./Signout.css";

function Signout() {
  const navigate = useNavigate();

  return (
    <div className="signout-container">
      <div className="signout-box">
        <h2>Do you want to sign out?</h2>
        <div className="signout-buttons">
          <button className="btn yes" onClick={() => navigate("/login")}>Yes</button>
          <button className="btn no" onClick={() => navigate("/")}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Signout;
