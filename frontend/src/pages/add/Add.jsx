import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const url = "https://admin-q79d.onrender.com";
  const [image, setImage] = useState(null);
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

  // Handles form input changes
  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === "checkbox") {
      setData((prevData) => {
        const updatedCourses = checked
          ? [...prevData.Course, value]
          : prevData.Course.filter((course) => course !== value);
        return { ...prevData, Course: updatedCourses };
      });
    } else if (name === "confirmEmail" || name === "confirmNumber") {
      if (name === "confirmEmail") {
        setConfirmEmail(value);
      } else if (name === "confirmNumber") {
        setConfirmNumber(value);
      }
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  
    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError(null);
      }
    }
  
    // Mobile validation
    if (name === "Mobile") {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(value)) {
        setMobileError("Please enter a valid 10-digit mobile number.");
      } else {
        setMobileError(null);
      }
    }
  
    // Confirmation email validation
    if (name === "confirmEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setConfirmEmailError("Please enter a valid email address.");
      } else {
        setConfirmEmailError(null);
      }
    }
  
    // Confirmation mobile validation
    if (name === "confirmNumber") {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(value)) {
        setConfirmNumberError("Please enter a valid 10-digit mobile number.");
      } else {
        setConfirmNumberError(null);
      }
    }
  };

  // Handles form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    if (!image) {
      return toast.error("Please upload an image before submitting!");
    }
  
    if (emailError || mobileError || confirmEmailError || confirmNumberError) {
      return; // Prevent submission if errors exist
    }
  
    if (data.email !== confirmEmail) {
      setConfirmEmailError(
        "Confirmation email does not match the original email."
      );
      return;
    }
  
    if (data.Mobile !== confirmNumber) {
      setConfirmNumberError(
        "Confirmation mobile number does not match the original mobile number."
      );
      return;
    }
  
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("Mobile", Number(data.Mobile));
    formData.append("Designation", data.Designation);
    formData.append("Gender", data.Gender);
    formData.append("Course", data.Course.join(", "));
    formData.append("image", image);
    formData.append("confirmEmail", confirmEmail);
    formData.append("confirmNumber", Number(confirmNumber));
  
    try {
      const response = await axios.post(`${url}/api/employee/add`, formData);
  
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          Mobile: "",
          Designation: "",
          Gender: "",
          Course: [],
        });
        setImage(null);
        setEmailError(null);
        setMobileError(null);
        setConfirmEmailError(null);
        setConfirmNumberError(null);
        setConfirmEmail("");
        setConfirmNumber("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred while adding employee.");
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <form className="form-container" onSubmit={onSubmitHandler}>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                id="email"
                name="email"
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmEmail" className="block">
                Confirm Email
              </label>
              <input
                onChange={onChangeHandler}
                value={confirmEmail}
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                required
              />
              {confirmEmailError && (
                <p className="error-message">{confirmEmailError}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="mobile" className="block">
                Mobile No
              </label>
              <input
                onChange={onChangeHandler}
                value={data.Mobile}
                type="text"
                id="mobile"
                name="Mobile"
                required
              />
              {mobileError && <p className="error-message">{mobileError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmNumber" className="block">
                Confirm Mobile No
              </label>
              <input
                onChange={onChangeHandler}
                value={confirmNumber}
                type="text"
                id="confirmNumber"
                name="confirmNumber"
                required
              />
              {confirmNumberError && (
                <p className="error-message">{confirmNumberError}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="designation" className="block">
                Designation
              </label>
              <select
                onChange={onChangeHandler}
                value={data.Designation}
                id="designation"
                name="Designation"
                required
              >
                <option value="" disabled>
                  Select Designation
                </option>
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
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="Upload Preview"
                />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                required
              />
            </div>

            <div className="form-group">
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
