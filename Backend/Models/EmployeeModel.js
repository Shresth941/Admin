import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  Mobile: { type: Number, required: true },
  Designation: { type: String, required: true, trim: true },
  Gender: { type: String, required: true, enum: ['M', 'F'] },
  Course: { type: String, required: true, trim: true },
  image: { type: String, required: true }, 
},{ timestamps: true });

const EmployeeModel = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default EmployeeModel;
