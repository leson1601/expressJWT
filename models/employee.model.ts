import { Schema, model, connect } from 'mongoose';
import { IEmployee } from '../Utils/interface';


const employeeSchema = new Schema<IEmployee>({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
});
const Employee = model<IEmployee>('Employee', employeeSchema);

export { Employee };