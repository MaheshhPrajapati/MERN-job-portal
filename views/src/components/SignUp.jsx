import axios from "axios";
import { useState } from "react";
import Message from "./Message";

export default function SignUp(props) {
  // Store SignUp message data
  const [signUpMessage, setSignUpMessage] = useState(false);
  // Store form data
  const [form, setForm] = useState({});
  function handleSignUp(e) {
    e.preventDefault();
    const url = "http://localhost:5000/api/v1/auth/register";
    //   POST Axios
    axios
      .post(url, { ...form })
      .then((res) => {
        console.log(res);
        if (res.status) {
          setSignUpMessage([true, res.data.message, res.status]);
          console.log(res.data.message);
          setTimeout(() => {
            setSignUpMessage();
          }, 1500);
          if (res.status == 201) {
            console.log("inside if 200 login one", res);
            setTimeout(() => {
              props.toggleLogin;
            }, 1500);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setSignUpMessage([
          true,
          err.response.data.message,
          err.response.status,
        ]);
        setTimeout(() => {
          setSignUpMessage();
        }, 1500);
      });
  }
  return (
    <>
      {signUpMessage && <Message message={signUpMessage} />}
      <h3 className="form-head">SignUp Form</h3>
      <form onSubmit={handleSignUp} className="form">
        <div className="form-label-input">
          <label className="label-tag">
            <span className="red-color">*</span>Enter Your Name
          </label>
          <input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-tag"
            // required
          />
        </div>
        <div className="form-label-input">
          <label className="label-tag">Enter Your Last Name</label>
          <input
            type="text"
            onChange={(e) => setForm({ ...form, lName: e.target.value })}
            className="input-tag"
          />
        </div>
        <div className="form-label-input">
          <label className="label-tag">
            <span className="red-color">*</span>Enter Your Email
          </label>
          <input
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-tag"
            // required
          />
        </div>
        <div className="form-label-input">
          <label className="label-tag">
            <span className="red-color">*</span>Enter Phone Number
          </label>
          <input
            type="text"
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            className="input-tag"
            // required
          />
        </div>
        <div className="form-label-input">
          <label className="label-tag">Enter User Type</label>
          <select
            className="select input-tag"
            onChange={(e) => setForm({ ...form, userType: e.target.value })}
            name="workType"
          >
            <option value="User">Job Hunt</option>
            <option value="Hiring">Hiring</option>
          </select>
        </div>
        <div className="form-label-input">
          <label className="label-tag">
            <span className="red-color">*</span>Enter Your Password
          </label>
          <input
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input-tag"
            // required
          />
        </div>
        <div className="form-label-input">
          <label className="label-tag">
            <span className="red-color">*</span>Confirm Password
          </label>
          <input
            type="password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="input-tag"
            // required
          />
        </div>
        <div className="form-label-input">
          <label className="label-tag">Enter Your Location</label>
          <input
            type="text"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="input-tag"
            // required
          />
        </div>
        <button className="submit-button" type="submit">
          Create User
        </button>
      </form>
      <div className="toggle-button">
        <a onClick={props.toggleLogin}>Already a User? Login</a>
      </div>
    </>
  );
}
