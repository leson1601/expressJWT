import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IToken } from '../Utils/interface';


const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string, function (err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        if (decoded) {
          req.body.userInfo = (decoded as IToken).userInfo;
        } else {
          res.status(401).json({ message: 'No Information in access token' });
        }
      }
    });
    next();
  } else {
    res.status(400).json({ message: 'Access token is required' });
  }
};

export { verifyJWT };