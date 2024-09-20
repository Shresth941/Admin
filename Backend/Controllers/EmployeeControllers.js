import EmployeeModel from "../Models/EmployeeModel.js";
import { unlink } from 'fs/promises'; 
import { validationResult } from 'express-validator'; 


const addEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) await unlink(req.file.path);
      return res.status(400).json({ success: false, message: "Invalid input", errors: errors.array() });
    }

    const employee = new EmployeeModel({
      name: req.body.name,
      email: req.body.email,
      Mobile: req.body.Mobile,
      Designation: req.body.Designation,
      Gender: req.body.Gender,
      Course: req.body.Course,
      image: req.file.filename, 
    });

    await employee.save();
    res.json({ success: true, message: "Employee Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Employee Not Added" });
  }
};
  

//list employee
const listEmployee=async(req,res)=>{
    try {
        const employee=await EmployeeModel.find({});
        res.json({success:true,message:"Employee List",data:employee});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Employee Not Found"});
        
    }

}
const removeEmployee = async (req, res) => {
    try {
      const employeeId = req.body.id;
      if (!employeeId) {
        return res.status(400).json({ success: false, message: "Employee ID is required" });
      }
  
      const employee = await EmployeeModel.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      const filePath = `uploads/${employee.image}`;
      await unlink(filePath).catch((err) => {
        console.log(`Error deleting file: ${err}`);
      });
  
      await EmployeeModel.findByIdAndDelete(employeeId);
      res.json({ success: true, message: "Employee Removed" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Employee Not Removed" });
    }
  };
  

  const updateEmployee = async (req, res) => {
    try {
      const employeeId = req.body.id;
      if (!employeeId) {
        return res.status(400).json({ success: false, message: "Employee ID is required" });
      }
  
      const updateData = {
        name: req.body.name,
        email: req.body.email,
        Mobile: req.body.Mobile,
        Designation: req.body.Designation,
        Gender: req.body.Gender,
        Course: req.body.Course,
      };
  
      if (req.file) {
        updateData.image = req.file.filename; // Handle new image if uploaded
      }
  
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(employeeId, updateData, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      res.json({ success: true, message: "Employee updated successfully", data: updatedEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Employee Not Updated" });
    }
  };
  
  

  
  const getEmployeeById = async (req, res) => {
    try {
      const employeeId = req.params.id;
      const employee = await EmployeeModel.findById(employeeId);
      
      if (!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      // Create the full URL for the image
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${employee.image}`;
      
      res.json({ 
        success: true, 
        data: { ...employee.toObject(), imageUrl } // Attach image URL
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error fetching employee details" });
    }
  };
  
  
  export { addEmployee, listEmployee, removeEmployee, updateEmployee,getEmployeeById };