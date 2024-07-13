import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import PopUpMessage from "./PopUpMessage";

export default function JobsLists() {
  // use State for storing Axios GET jobs array
  const [jobs, setJobs] = useState();

  // Store message data
  const [message, setMessage] = useState(false);
  const [popUp,setPopUp] = useState("");
  //setTimeout(()=>{setPopUp("")},6000);

  // useState for catching selected job
  const [selectedJob, setSelectedJob] = useState();
  //const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const url = "http://localhost:5000/api/v1/job/listed-jobs";
      const token = localStorage.getItem("token");
      if (token && token.startsWith("Bearer")) {
        await axios
          .get(url, { headers: { authorization: token } })
          .then((res) => {
            console.log(res.data,"resss");
            setJobs(res.data.jobs);
            setSelectedJob(res.data.jobs[0]);
            // console.log(res.data.jobs);
          })
          .catch((error) => {
            console.error(error);            
            //console.error(typeof error.response.data.message, "mila");
          });
      } else {
        setPopUp("No Valid Token Found!")
        //navigate("/login");
      }
    }
    getData();
  }, []);

  // Function handle job click
  function handleJobClick(job) {
    setSelectedJob(job);
  }

  // function handle edit job
  function handleEditJob(id) {
    localStorage.setItem("jobId", id);
  }

  function handleDeleteJob(id) {
    const token = localStorage.getItem("token");
    const validate = prompt("Do you really want to delete the job? y/n");
    if (validate == "y") {
      if (token && token.startsWith("Bearer")) {
        const url = `http://localhost:5000/api/v1/job/delete-job/${id}`;
        axios
          .delete(url, { headers: { authorization: token } })
          .then((res) => {
            console.log(res);
            if (res.status) {
              setMessage([true, res.data.message, res.status]);
            }
          })
          .catch((err) => {
            console.log(err);
            setMessage([true, err.data.message, err.status]);
            alert(err.message);
          });
      }
    }
  }

  return (
    <div className="jobs-Page-Container">
      <input type="text" className="search-box" placeholder="Search job" />
      {/* {popUp.length > 0 && <PopUpMessage message={popUp} />} */}
      {message && <Message message={message} />}
      <div className="jobs-container-left-stick">
        {jobs ? (
          jobs.map((job, index) => (
            <Card
              key={index}
              className="job-wrapper"
              onClick={() => handleJobClick(job)}
            >
              <Card.Body>
                <Card.Title className="job-position">{job.position}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted job-companyName">
                  {job.companyName}
                </Card.Subtitle>
                <Card.Subtitle className="job-workType">
                  {job.workType}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))
        ) : (
          <>Loading...</>
        )}
      </div>
      {selectedJob ? (
        <div className="job-inDetail">
          <div
            className="editLink"
            onClick={() => handleEditJob(selectedJob._id)}
          >
            <Link className="navbar-links" to="/edit-job">
              Edit Job
            </Link>
          </div>
          <div
            className="editLink"
            onClick={() => handleDeleteJob(selectedJob._id)}
          >
            Delete Job
          </div>
          <div className="jobDetail-position">{selectedJob.position}</div>
          <div className="jobDetail-companyName">{selectedJob.companyName}</div>
          <div>Posted on: {selectedJob.createdAt.substring(0, 10)}</div>
          <div className="jobDetail-jobDescription">
            {selectedJob.jobDescription}
          </div>
          <button className="apply-btn">Apply Now</button>
        </div>
      ) : (
        <>{<p>No Jobs Created. Start creating</p>}</>
      )}
    </div>
  );
}
