import { Request, Response } from 'express';
import { User } from '../models/user.model';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const handleRefreshToken = async (req: Request, res: Response) => {
  if (!req.cookies) return res.sendStatus(403);

  const refreshToken = req.cookies.refreshToken;
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY as string, function (err: any, decoded: any) {
    if (err || foundUser.username !== decoded.userInfo.user) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign({
      userInfo: { user: foundUser.username, roles: foundUser.roles }
    }, process.env.ACCESS_TOKEN_SECRET_KEY as string, { expiresIn: "15s" });

    return res.status(200).json({ accessToken });
  });

};

export default handleRefreshToken;