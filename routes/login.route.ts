import express, { Router } from 'express';
import handleLogin from '../controllers/login.controller';



const loginRouter: Router = express.Router();


// Create user
loginRouter.post('/', handleLogin );

//export this loginRouter to use in our index.js
export default loginRouter;