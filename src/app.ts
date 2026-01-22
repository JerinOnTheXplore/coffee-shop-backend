import express, { Application } from "express"

const app:Application = express();

app.get("/",(req,res)=>{
    res.send("Hell00 World");
})

export default app;