import { Request, Response } from "express";
import { coffeeServices } from "./coffee.service";


const createCoffee = async (req: Request, res: Response) => {
  try {
    const coffee = await coffeeServices.createCoffee(req.body);

    res.status(201).json({
      success: true,
      message: "Coffee created successfully",
      data: coffee,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllCoffees = async (_req: Request, res: Response) => {
  try {
    const coffees = await coffeeServices.getAllCoffees();

    res.status(200).json({
      success: true,
      message: "All coffees fetched successfully",
      data: coffees,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const coffeeControllers = {
  createCoffee,
  getAllCoffees,
  
};
