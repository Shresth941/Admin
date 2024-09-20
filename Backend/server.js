import express from 'express';
import cors from 'cors';
import { connectDb } from './Config/db.js';
import UserRouter from './Routes/UserRoute.js';
import dotenv from 'dotenv';
import employeeRouter from './Routes/EmployeeRoute.js';
dotenv.config();



// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDb()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    // Add retry mechanism or more informative error message here
  });

// API endpoints
app.use("/api/user", UserRouter);
app.use("/api/employee",employeeRouter)
app.use('/images', express.static('uploads'));



app.get('/', (req, res) => {
  res.send('Hello, it\'s working!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//mongodb+srv://shresthsingh:Shresth123@cluster0.aprj7.mongodb.net/?