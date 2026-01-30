import { useEffect, useState } from "react";
import api from "./api/api";
import "./employee.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  const fetchEmployees = async () => {
    try {
      const res = await api.get(`employees?page=${page}`);
      console.log("Fetched employees:", res.data);
      setEmployees(res.data);
    } catch (err) {
      console.error(
        "Error fetching employees:",
        err.response?.data || err.message,
      );
      alert(
        "Failed to fetch employees: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="table-container">
      <h1>Employees List</h1>

      <table border={2} style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>National ID</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Serial Number</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.firstname}</td>
                <td>{emp.lastname}</td>
                <td>{emp.national_id}</td>
                <td>{emp.phone}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.manufacturer}</td>
                <td>{emp.model}</td>
                <td>{emp.serial_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={handleNextPage} disabled={employees.length < 5}>
          Next
        </button>
      </div>
    </div>
  );
}
