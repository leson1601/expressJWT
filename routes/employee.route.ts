import express, { Router } from 'express';
import { getEmployees } from '../controllers/employee.controller';

const employeeRouter: Router = express.Router();

employeeRouter.get('/', getEmployees);

//export this employeeRouter to use in our index.js
export default employeeRouter;