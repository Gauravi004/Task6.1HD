import './Search.css';
import { Outlet, Link, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  return (
    <div className="search">
      <p id="username">Dev@Deakin</p>
      <input className="input" type="text" placeholder="Search" />

      <div className="button-container">
        <Link className="btn" to="/">Home</Link>
        <Link className="btn" to="/assistant">Assistant</Link>
        <Link className="btn" to="/2fa">2FA</Link>
        <Link className="btn" to="/video-gallery">Videos</Link>
        <Link className="btn" to="/comments">Comments</Link>
        <Link className="btn" to="/post">Post</Link>
        <Link className="btn" to="/login">Login</Link>
        <Link className="btn plans" to="/plans">Plans</Link>
  
        <button className="btn signout" onClick={() => navigate("/signout")}>
          Signout
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default Search;
