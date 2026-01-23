import express, { Application } from "express"
import { coffeeRoutes } from "./modules/coffee/coffee.router";

const app:Application = express();

app.use(express.json());

app.use("/coffees",coffeeRoutes);

app.get("/",)

export default app;