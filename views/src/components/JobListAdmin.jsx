import axios from "axios";
import { useEffect, useState } from "react";

export default function JobsListAdmin() {
  //store jobs data
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    //get users and jobs data function
    async function getData() {
      const url = "http://localhost:5000/api/v1/admin/getData";
      const token = localStorage.getItem("token");
      if (token && token.startsWith("Bearer")) {
        await axios
          .get(url, { headers: { authorization: token } })
          .then((res) => {
            setJobs(res.data.jobs);
            console.log(res.data.users, "log");
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      }
    }
    getData();
  }, []);
  return (
    <table className="admin-content">
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Position</th>
          <th>Status</th>
          <th>Work Type</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>

      {jobs?.map((job) => {
        return (
          <>
            <div className="row"></div>
            <tr key={job._id}>
              <td>{job.companyName}</td>
              <td>{job.position}</td>
              <td>{job.status}</td>
              <td>{job.workType}</td>
              <td>{job.location}</td>
              <td>
                <button className="delete-btn">Delete</button>
              </td>
              <td>
                <button className="update-btn">Update</button>
              </td>
            </tr>
          </>
        );
      })}
    </table>
  );
}
