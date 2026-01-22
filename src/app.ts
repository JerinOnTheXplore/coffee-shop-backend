import express, { Application } from "express"
import { coffeeRouter } from "./modules/coffee/coffee.router";

const app:Application = express();

app.use(express.json());

app.use("/coffees",coffeeRouter);

app.get("/",(req,res)=>{
    res.send("Hell00 World");
})

export default app;