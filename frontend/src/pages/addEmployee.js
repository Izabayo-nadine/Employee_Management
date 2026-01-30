import { useState } from "react";
import api from "./api/api";
import "./addEmployee.css";

export default function AddEmployees({ setCurrentPage }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("employees/create", form);

      alert("Employee Added Successfully");

      setForm({
        firstname: "",
        lastname: "",
        national_id: "",
        phone: "",
        email: "",
        department: "",
        position: "",
        manufacturer: "",
        model: "",
        serial_number: "",
      });

      // Redirect to employees list
      setCurrentPage("employees");
    } catch (err) {
      console.log(err);
      alert("Failed to Add Employee");
    }
  };

  return (
    <div  className="emp-container">
      <h1 style={{color: "rgb(113, 113, 236)"}}>Add Employee</h1>

      <form onSubmit={handleSubmit}>

        <input id="fname"
          type="text"
          placeholder="First Name"
          name="firstname"
          value={form.firstname || ""}
          onChange={handleChange}
        />
        
        <input id="lname"
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={form.lastname || ""}
          onChange={handleChange}
        />
        
        <div className="num">
        <input id="id"
          type="text"
          placeholder="National ID"
          name="national_id"
          value={form.national_id || ""}
          onChange={handleChange}
        />
        
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
        />
        </div>
        <input id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
        />
        
        <div className="dp">
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={form.department || ""}
          onChange={handleChange}
        />
        
        <input
          type="text"
          placeholder="Position"
          name="position"
          value={form.position || ""}
          onChange={handleChange}
        />
        </div>
        <div className="mm">
        <input
          type="text"
          placeholder="Manufacturer"
          name="manufacturer"
          value={form.manufacturer || ""}
          onChange={handleChange}
        />
        
        <input
          type="text"
          placeholder="Model"
          name="model"
          value={form.model || ""}
          onChange={handleChange}
        />
        </div>
        <input id ="sn"
          type="text"
          placeholder="Serial Number"
          name="serial_number"
          value={form.serial_number || ""}
          onChange={handleChange}
        />
        

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}
