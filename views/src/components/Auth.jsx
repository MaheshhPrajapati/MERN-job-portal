import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

export default function Auth() {
  // should show login or signup
  const [isLogin, setIsLogin] = useState(false);

  //toggle Login Function
  function toggleLogin() {
    console.log("toggled login");
    setIsLogin(!isLogin);
  }

  return (
    <div className="outer-container">
      <div className="inner-container">
        {isLogin ? (
          <>
            <Login toggleLogin={toggleLogin} />
            {/* <h3 className="form-head">LOGIN FORM</h3>
            <form onSubmit={handleLogin} className="form">
              <label className="label-tag">Enter Your Email</label>
              <input
                className="input-tag"
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <label className="label-tag">Enter Your Password</label>
              <input
                type="password"
                className="input-tag"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button className="submit-button" type="submit">
                LOGIN
              </button>
            </form>
            <div className="toggle-button">
              <a onClick={() => setIsLogin(false)}>Sign Up?</a>
            </div> */}
          </>
        ) : (
          <>
            <SignUp toggleLogin={toggleLogin} />
            {/* <h3 className="form-head">SignUp Form</h3>
            <form onSubmit={handleSignUp} className="form">
              <label className="label-tag">Enter Your Name</label>
              <input
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-tag"
                required
              />
              <label className="label-tag">Enter Your Email</label>
              <input
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-tag"
                required
              />
              <label className="label-tag">Enter Your Password</label>
              <input
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-tag"
                required
              />
              <label className="label-tag">Enter Your Location</label>
              <input
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="input-tag"
                required
              />
              <button className="submit-button" type="submit">
                Create User
              </button>
            </form>
            <div className="toggle-button">
              <a onClick={() => setIsLogin(true)}>Already a User? Login</a>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
