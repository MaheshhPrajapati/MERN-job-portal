import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

export default function EditJob() {
  // Store Job Id
  const [jobId, setJobId] = useState();

  // Store message data
  const [message, setMessage] = useState(false);

  // Store Form Details
  const [form, setForm] = useState();

  const navigate = useNavigate();

  // Get Job ID only once
  useEffect(() => {
    const id = localStorage.getItem("jobId");
    setJobId(id);
  }, []);

  // function for sending editing data to backend axios || PUT
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(form);
    const url = `http://localhost:5000/api/v1/job/update-job/${jobId}`;

    // Get token
    const token = localStorage.getItem("token");

    if (token && token.startsWith("Bearer")) {
      //Patch request to update the job
      axios
        .patch(url, { ...form }, { headers: { authorization: token } })
        .then((res) => {
          if (res.status) {
            setMessage([true, res.data.message, res.status]);
            setTimeout(() => {
              setMessage(false);
            }, 1500);

            if (res.status == 200) {
              setTimeout(() => {
                navigate("/");
              }, 1500);
            }
          }
        })
        .catch((err) => {
          setMessage([true, err.data.message, err.status]);
          setTimeout(() => {
            setMessage();
          }, 1500);
          console.log(err);
        });
    }
  }

  return (
    <div className="outer-container">
      {message && <Message message={message} />}
      <div className="inner-container">
        <form onSubmit={handleFormSubmit} className="form">
          <h3 className="form-head">Enter Updated Details</h3>

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
              className="input-tag select"
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
            <label className="label-tag">
              Enter Job Description under 100 characters
            </label>
            <textarea
              className="input-tag"
              placeholder=""
              type="text"
              onChange={(e) =>
                setForm({ ...form, jobDescription: e.target.value })
              }
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}
