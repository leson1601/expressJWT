import { Schema, model, connect } from 'mongoose';
import { IUser } from '../Utils/interface';


const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  password: {
    type: String,
    require: true

  },
  refreshToken: String,
});
const User = model<IUser>('User', userSchema);

export { User };