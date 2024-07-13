import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar-outer-container">
      <nav className="navbar-container">
        <div className="Nav-title">MERN App</div>
        <div className="Nav-links">
          <Link className="navbar-links" to="/about">
            About
          </Link>
          <Link className="navbar-links" to="/">
            Your Jobs
          </Link>
          <Link className="navbar-links" to="/create-job">
            Create New Job
          </Link>
          <Link className="navbar-links" to="/edit-user">
            Edit Your Account
          </Link>
          <Link className="navbar-links" to="/login">
            Login/SignUp
          </Link>
        </div>
      </nav>
    </div>
  );
}
