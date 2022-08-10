import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { User } from '../models/user.model';


dotenv.config();

const handleLogout = async (req: Request, res: Response) => {
  if (!req.cookies) return res.sendStatus(403);

  const refreshToken = req.cookies.refreshToken;
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  res.clearCookie("refreshToken", { httpOnly: true });
  return res.sendStatus(204);
};

export default handleLogout;