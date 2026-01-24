import { Request, Response } from "express";
import { CoffeeService } from "./coffee.service";

const createCoffee = async (req: any, res: Response) => {
  try {
    const adminId = req.user.id; 
    const result = await CoffeeService.createCoffee(adminId, req.body);

    res.status(201).json({
      success: true,
      message: "Coffee created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCoffees = async (req: Request, res: Response) => {
  const result = await CoffeeService.getAllCoffees();
  res.status(200).json({
    success: true,
    data: result,
  });
};

const getSingleCoffee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CoffeeService.getSingleCoffee(id as string);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const CoffeeController = {
  createCoffee,
  getAllCoffees,
  getSingleCoffee,
};
