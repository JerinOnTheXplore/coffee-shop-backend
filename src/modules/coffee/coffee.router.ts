import express, { Request, Response, Router } from "express";
import { coffeeControllers } from "./coffee.controller";

const router = express.Router();

//create coffee 

router.post("/", coffeeControllers.createCoffee); 
router.get("/", coffeeControllers.getAllCoffees);


  

export const coffeeRoutes:Router = router;