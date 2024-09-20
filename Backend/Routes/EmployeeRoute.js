import express from 'express';
import { addEmployee, listEmployee, removeEmployee, updateEmployee, getEmployeeById } from '../Controllers/EmployeeControllers.js';
import multer from 'multer';

const employeeRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route definitions
employeeRouter.post('/add', upload.single('image'), addEmployee);
employeeRouter.get('/list', listEmployee);
employeeRouter.post('/remove', removeEmployee);
employeeRouter.put('/update', upload.single('image'), updateEmployee); // Modified for single file upload
employeeRouter.get('/:id', getEmployeeById);

export default employeeRouter;
