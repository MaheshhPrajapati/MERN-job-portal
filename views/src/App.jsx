import "./App.css";
import Auth from "./components/Auth";
import { Route, Routes } from "react-router-dom";
import JobsLists from "./components/JobsLists";
import NavBar from "./components/NavBar";
import CreateJob from "./components/CreateJob";
import EditAccount from "./components/EditAccount";
import EditJob from "./components/EditJob";
import About from "./components/About";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<JobsLists />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/edit-user" element={<EditAccount />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/edit-job" element={<EditJob />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
