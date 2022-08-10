import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config();


const handleLogin = async (req: Request, res: Response) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: 'user and pwd are required' });
  const foundUser = await User.findOne({ username: user });

  if (!foundUser) return res.sendStatus(401);
  const match = await bcrypt.compare(pwd, foundUser.password as string);
  if (!match) return res.sendStatus(401);

  const accessToken = jwt.sign({
    userInfo: { user: foundUser.username, roles: foundUser.roles }
  }, process.env.ACCESS_TOKEN_SECRET_KEY as string, { expiresIn: "15s" });

  const refreshToken = jwt.sign({
    userInfo: { user: foundUser.username }
  }, process.env.REFRESH_TOKEN_SECRET_KEY as string, { expiresIn: "1d" });
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();
  res.cookie("refreshToken", refreshToken);

  return res.status(200).json({ accessToken });
};

export default handleLogin;
