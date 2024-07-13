import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import PopUpMessage from "./PopUpMessage";

export default function CreateJob() {
  // store Form data
  const [form, setForm] = useState();

  // validate message
  const [message, setMessage] = useState(false);
  const [popUp, setPopUp] = useState("");

  const navigate = useNavigate();
  function handleFormSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:5000/api/v1/job/create-job";
    const token = localStorage.getItem("token");
    if (token && token.startsWith("Bearer")) {
      axios
        .post(url, { ...form }, { headers: { authorization: token } })
        .then((res) => {
          console.log(res);
          if (res.status) {
            setMessage([true, res.data.message, res.status]);

            setTimeout(() => {
              setMessage();
            }, 1500);
            if (res.status == 201) {
              setTimeout(() => {
                navigate("/");
              }, 1500);
            }
          }
        })
        .catch((err) => {
          console.log(err.response.data.message, "errr");
          if (err.response.data.message == "JWT Token Expired") {
            setPopUp("JWT Token Expired!! Please login Again");
          }
          setMessage([true, err.data.message, err.status]);
          setTimeout(() => {
            setMessage();
          }, 1500);
        });
    } else {
      alert("No Valid token found");
    }
  }
  return (
    <div className="outer-container">
      {popUp.length > 0 && <PopUpMessage message={popUp} />}
      {message && <Message message={message} />}
      <div className="inner-container">
        <form onSubmit={handleFormSubmit} className="form">
          <h3 className="form-head">Create New Job</h3>

          <div className="form-label-input">
            <label className="label-tag">Enter Company Name</label>
            <input
              className="input-tag"
              type="text"
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
              required
            />
          </div>
          <div className="form-label-input">
            <label className="label-tag">Enter Position</label>
            <input
              className="input-tag"
              type="text"
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              required
            />
          </div>

          <div className="form-label-input">
            <label className="label-tag">Enter Work Type</label>
            <select
              className="select input-tag"
              onChange={(e) => setForm({ ...form, workType: e.target.value })}
              name="workType"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
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
          <div className="form-label-input">
            <label className="label-tag">Job Description</label>
            <textarea
              className="input-tag"
              type="text"
              placeholder="Job Description under 100 characters"
              onChange={(e) =>
                setForm({ ...form, jobDescription: e.target.value })
              }
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}
