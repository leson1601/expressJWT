import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from "./routes/register.route";
import mongoose from 'mongoose';
import { connectDB } from './config/dbConn';
import bodyParser from 'body-parser';
import registerRouter from './routes/register.route';
import loginRouter from './routes/login.route';
import { verifyJWT } from './middlewares/verifyJWT';
import refreshTokenRouter from './routes/refreshToken.route';
import logoutRouter from './routes/logout.route';
import employeeRouter from './routes/employee.route';
var cookieParser = require('cookie-parser');

dotenv.config();

// Connect to Mongodb
connectDB();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/logout", logoutRouter)

app.use(verifyJWT);
app.use("/employees", employeeRouter);

app.use("/test", (req, res) => {
  const userInfo = req.body.userInfo;
  return res.send("test");
});


mongoose.connection.once("open", () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
});
