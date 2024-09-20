import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import "./List.css";

const url = "http://localhost:4000";

const List = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]); // State for filtered list
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [error, setError] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/employee/list`);
      if (response.data.success) {
        setList(response.data.data);
        setFilteredList(response.data.data); // Initialize filtered list with full data
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      setError(`Error fetching list: ${error.message}`);
    }
  };

  const removeEmployee = async (employeeId) => {
    try {
      const response = await axios.post(`${url}/api/employee/remove`, { id: employeeId });
      await fetchList();
      if (response.data.success) {
        toast.success("Employee removed successfully");
      } else {
        toast.error("Failed to remove employee");
      }
    } catch (error) {
      setError(`Error removing employee: ${error.message}`);
    }
  };

  // Filter list based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredList(list); // Reset to full list when search is empty
    } else {
      const filtered = list.filter((item) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item._id.includes(searchTerm) ||
        (item.Mobile && item.Mobile.toString().includes(searchTerm)) // Convert Mobile to string if it exists
      );
      setFilteredList(filtered);
    }
  }, [searchTerm, list]);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <p>Total Count: {filteredList.length}</p>
        <input
  type="text"
  placeholder="Name, Email, or ID"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)} 
  className="search-input"
  style={{
    width: '200px',
    borderRadius: '20px'
  }}
/>
      </div>

      <div className="list-table">
        <div className="list-table-header">
          <b>ID</b>
          <b>Image</b>
          <b>Name</b>
          <b>Email</b>
          <b>Mobile No.</b>
          <b>Designation</b>
          <b>Gender</b>
          <b>Course</b>
          <b>Create Date</b>
          <b>Action</b>
        </div>

        {filteredList.length === 0 && <p>No Employees Found</p>}

        <div className="list-content">
          {filteredList.map((item, index) => (
            <div key={item._id || index} className="list-row">
              <p>{item._id}</p>
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.Mobile}</p>
              <p>{item.Designation}</p>
              <p>{item.Gender}</p>
              <p>{item.Course}</p>
              <p>{new Date(item.createdAt).toLocaleDateString()}</p>
              <button onClick={() => removeEmployee(item._id)} className="delete-btn">
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
