import express, { Router} from 'express';
import handleRegister from '../controllers/register.controller';
const registerRouter: Router = express.Router();



// Create user
registerRouter.post('/', handleRegister);

//export this registerRouter to use in our index.js
export default registerRouter;