import  {  Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

dotenv.config();
const salt = parseInt(process.env.SALT as string);

const handleRegister = async (req: Request, res: Response) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: 'user and pwd are required' });
  const foundUser = await User.findOne({ username: user });
  if (!foundUser) {
    const hashedPwd = await bcrypt.hash(pwd, salt || 10);
    await User.create({
      username: user,
      password: hashedPwd,
    });
    return res.sendStatus(201);
  } else {
    return res.sendStatus(409);
  }
};

export default handleRegister