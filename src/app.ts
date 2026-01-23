import express, { Application } from "express"
import authRouter from './modules/auth/auth.router';
import { authMiddleware } from "./middlewares/auth.middleware";
import { roleMiddleware } from "./middlewares/role.middleware";

const app:Application = express();

app.use(express.json());



app.get("/",)

export default app;