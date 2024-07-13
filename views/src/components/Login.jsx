import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { useState } from "react";

export default function Login(props) {
  const navigate = useNavigate();

  // Store form data
  const [form, setForm] = useState({});

  // store Login Message
  const [loginMessage, setLoginMessage] = useState(false);

  //   Function for handling fo submit
  function handleLogin(e) {
    e.preventDefault();
    const url = "http://localhost:5000/api/v1/auth/login";

    //   POST Axios
    axios
      .post(url, { ...form })
      .then((res) => {
        if (res.status) {
          setLoginMessage([true, res.data.message, res.status]);
          setTimeout(() => {
            setLoginMessage();
          }, 1500);

          if (res.status == 200) {
            localStorage.setItem("token", "Bearer " + res.data.token);
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        }
      })
      .catch((err) => {
        setLoginMessage([true, err.response.data.message, err.response.status]);
        setTimeout(() => {
          setLoginMessage();
        }, 1500);
      });
  }

  return (
    <>
      {loginMessage && <Message message={loginMessage} />}
      <h3 className="form-head">LOGIN FORM</h3>
      <form onSubmit={handleLogin} className="form">
        <div className="form-label-input">
          <label className="label-tag">Enter Your Email</label>
          <input
            className="input-tag"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="form-label-input">
          <label className="label-tag">Enter Your Password</label>
          <input
            type="password"
            className="input-tag"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          LOGIN
        </button>
      </form>
      <div className="toggle-button">
        <a onClick={props.toggleLogin}>Sign Up?</a>
      </div>
    </>
  );
}
