import { useState } from "react";
import JobsListAdmin from "./JobListAdmin";
import UserListAdmin from "./UserListAdmin";

export default function AdminDashboard() {
  const [isShowJobs, setIsShowJobs] = useState(false);
  console.log(isShowJobs);
  return (
    <div>
      <form className="radio-form">
        <input
          type="radio"
          className="radio-input"
          name="data"
          id="users"
          value="users"
          onClick={() => setIsShowJobs(false)}
        />
        <label htmlFor="users">Users</label>
        <input
          type="radio"
          className="radio-input"
          name="data"
          id="jobs"
          value="jobs"
          onClick={() => setIsShowJobs(true)}
        />
        <label htmlFor="jobs">Jobs</label>
      </form>
      {isShowJobs ? <JobsListAdmin /> : <UserListAdmin />}
    </div>
  );
}
