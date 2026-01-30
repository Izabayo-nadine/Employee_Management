import { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login";
import AddEmployees from "./pages/addEmployee";
import Employees from "./pages/employees";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("employees");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    navigate(page === "add" ? "/add-employee" : "/employees");
  };

  return (
    <div className="main-container">
      <h1>Employee Management System</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleNavigate("employees")}
          style={{
            marginRight: "10px",
            fontWeight: currentPage === "employees" ? "bold" : "normal",
          }}
        >
          View Employees
        </button>
        <button
          onClick={() => handleNavigate("add")}
          style={{
            marginRight: "10px",
            fontWeight: currentPage === "add" ? "bold" : "normal",
          }}
        >
          Add Employee
        </button>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff6b6b",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {currentPage === "employees" && <Employees />}
      {currentPage === "add" && (
        <AddEmployees setCurrentPage={() => handleNavigate("employees")} />
      )}
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/employees" />} />
      </Routes>
    </Router>
  );
}
