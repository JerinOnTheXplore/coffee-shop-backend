import express, { Application } from "express"
import { authMiddleware } from "./middlewares/auth.middleware";

const app:Application = express();

app.use(express.json());



app.get("/",)

export default app;