import express, { Router, Request, Response } from 'express';

import handleRefreshToken from '../controllers/refreshToken.controller';


const refreshTokenRouter: Router = express.Router();
const salt = parseInt(process.env.SALT as string);


// Create user
refreshTokenRouter.get('/', handleRefreshToken );

//export this refreshTokenRouter to use in our index.js
export default refreshTokenRouter;