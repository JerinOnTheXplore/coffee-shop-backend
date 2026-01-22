import express, { Request, Response, Router } from "express";

const router = express.Router();

//create coffee (only admin..)

router.post("/",(req,res)=>{
    res.send("Create a new coffee")
})

export const coffeeRouter:Router = router;