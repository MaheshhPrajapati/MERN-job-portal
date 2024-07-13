import axios from "axios";
import { useEffect, useState } from "react";

export default function UserListAdmin() {
  //store users data
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //get users and jobs data function
    async function getData() {
      const url = "http://localhost:5000/api/v1/admin/getData";
      const token = localStorage.getItem("token");
      if (token && token.startsWith("Bearer")) {
        await axios
          .get(url, { headers: { authorization: token } })
          .then((res) => {
            setUsers(res.data.users);
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
          <th>Email</th>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.location}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
