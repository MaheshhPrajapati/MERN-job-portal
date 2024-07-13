import axios from "axios";
import { useState } from "react";
import Message from "./Message";

export default function CreateJob() {
  // Store form data
  const [form, setForm] = useState();

  // Store message data
  const [message, setMessage] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:5000/api/v1/user/update-user";
    const token = localStorage.getItem("token");
    axios
      .put(url, { ...form }, { headers: { authorization: token } })
      .then((res) => {
        if (res.status) {
          console.log(res);
          setMessage([true, res.data.message, res.status]);
        }
      })
      .catch((err) => {
        setMessage([true, err.data.message, err.status]);
        console.log(err);
      });
  }
  return (
    <div className="outer-container">
      {message && <Message message={message} />}
      <div className="inner-container">
        <form onSubmit={handleFormSubmit} className="form">
          <h3 className="form-head">Enter Updated Details</h3>

          <div className="form-label-input">
            <label className="label-tag">Enter Name</label>
            <input
              className="input-tag"
              type="text"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-label-input">
            <label className="label-tag">Enter Email</label>
            <input
              className="input-tag"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-label-input">
            <label className="label-tag">Enter Location</label>
            <input
              className="input-tag"
              type="text"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
