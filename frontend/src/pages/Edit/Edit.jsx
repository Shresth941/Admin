import React, { useState, useEffect } from "react";
import './Edit.css';

import axios from "axios";
import { toast } from "react-toastify";


const Edit = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    Mobile: "",
    Designation: "",
    Gender: "",
    Course: [],
  });

  const [emailError, setEmailError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmNumber, setConfirmNumber] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState(null);
  const [confirmNumberError, setConfirmNumberError] = useState(null);

  const fetchEmployeeById = async (id) => {
    try {
      const response = await axios.get(`${url}/api/employee/${id}`);
      if (response.data.success) {
        const employee = response.data.data;
        setData({
          name: employee.name,
          email: employee.email,
          Mobile: employee.Mobile,
          Designation: employee.Designation,
          Gender: employee.Gender,
          Course: employee.Course.split(", "),
        });
        setConfirmEmail(employee.email);
        setConfirmNumber(employee.Mobile);
        setPreviewImage(`${url}/images/${employee.image}`);
        toast.success("Employee details fetched successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching employee details.");
    }
  };

  const handleIdChange = (event) => {
    const id = event.target.value;
    setEmployeeId(id);
    if (id.length === 24) {
      fetchEmployeeById(id);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setData((prevData) => {
        const updatedCourses = checked
          ? [...prevData.Course, value]
          : prevData.Course.filter((course) => course !== value);
        return { ...prevData, Course: updatedCourses };
      });
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? null : "Please enter a valid email address.");
    }

    if (name === "Mobile") {
      const mobileRegex = /^\d{10}$/;
      setMobileError(mobileRegex.test(value) ? null : "Please enter a valid 10-digit mobile number.");
    }

    if (name === "confirmEmail") {
      setConfirmEmailError(value !== data.email ? "Confirmation email does not match." : null);
      setConfirmEmail(value); // Update state
    }

    if (name === "confirmNumber") {
      setConfirmNumberError(value !== data.Mobile ? "Confirmation mobile number does not match." : null);
      setConfirmNumber(value); // Update state
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (emailError || mobileError || confirmEmailError || confirmNumberError) {
      return;
    }

    const formData = new FormData();
    formData.append("id", employeeId);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("Mobile", data.Mobile);
    formData.append("Designation", data.Designation);
    formData.append("Gender", data.Gender);
    formData.append("Course", data.Course.join(', '));

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`${url}/api/employee/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Employee updated successfully!");
        // Clear input fields after successful update
        setData({
          name: "",
          email: "",
          Mobile: "",
          Designation: "",
          Gender: "",
          Course: [],
        });
        setConfirmEmail("");
        setConfirmNumber("");
        setImage(null);
        setPreviewImage(""); // Reset image preview
        setEmployeeId(""); // Clear employee ID input
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update employee");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <form className="form-container" onSubmit={onSubmitHandler}>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="employeeId" className="block">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                value={employeeId}
                onChange={handleIdChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="block">Name</label>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block">Email</label>
              <input
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                name="email"
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmEmail" className="block">Confirm Email</label>
              <input
                onChange={onChangeHandler}
                value={confirmEmail}
                type="email"
                name="confirmEmail"
                required
              />
              {confirmEmailError && <p className="error-message">{confirmEmailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="mobile" className="block">Mobile No</label>
              <input
                onChange={onChangeHandler}
                value={data.Mobile}
                type="text"
                name="Mobile"
                required
              />
              {mobileError && <p className="error-message">{mobileError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmNumber" className="block">Confirm Mobile No</label>
              <input
                onChange={onChangeHandler}
                value={confirmNumber}
                type="text"
                name="confirmNumber"
                required
              />
              {confirmNumberError && <p className="error-message">{confirmNumberError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="designation" className="block">Designation</label>
              <select
                onChange={onChangeHandler}
                value={data.Designation}
                name="Designation"
                required
              >
                <option value="" disabled>Select Designation</option>
                <option>HR</option>
                <option>Manager</option>
                <option>Sales</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">Gender</label>
              <div className="radio-group">
                <input
                  onChange={onChangeHandler}
                  type="radio"
                  id="male"
                  name="Gender"
                  value="M"
                  checked={data.Gender === "M"}
                />
                <label htmlFor="male">Male</label>
                <input
                  onChange={onChangeHandler}
                  type="radio"
                  id="female"
                  name="Gender"
                  value="F"
                  checked={data.Gender === "F"}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <div className="form-group">
              <label className="block">Course</label>
              <div className="checkbox-group">
                <input
                  onChange={onChangeHandler}
                  type="checkbox"
                  id="mca"
                  name="Course"
                  value="MCA"
                  checked={data.Course.includes("MCA")}
                />
                <label htmlFor="mca">MCA</label>
                <input
                  onChange={onChangeHandler}
                  type="checkbox"
                  id="bca"
                  name="Course"
                  value="BCA"
                  checked={data.Course.includes("BCA")}
                />
                <label htmlFor="bca">BCA</label>
                <input
                  onChange={onChangeHandler}
                  type="checkbox"
                  id="bsc"
                  name="Course"
                  value="BSC"
                  checked={data.Course.includes("BSC")}
                />
                <label htmlFor="bsc">BSC</label>
              </div>
            </div>
            <div className="form-group">
              <label className="block">Select the New Image</label>
              
              {previewImage && <img src={previewImage} alt="Profile Preview" />}
              <input
                type="file"
                name="image"
                
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }}
              />
              
            </div>
            <button className="submit-button" type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
