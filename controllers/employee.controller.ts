import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();


const getEmployees = async (req: Request, res: Response) => {
  return res.sendStatus(200)
};

export {getEmployees};
