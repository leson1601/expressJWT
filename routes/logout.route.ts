import express, { Router } from 'express';
import handleLogout from '../controllers/logout.controller';

const logoutRouter: Router = express.Router();

logoutRouter.get('/', handleLogout);

//export this logoutRouter to use in our index.js
export default logoutRouter;