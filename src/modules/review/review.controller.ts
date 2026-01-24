import { Request, Response } from "express";
import { ReviewService } from "./review.service";


const createReview= async (req:any, res:Response)=>{
    try{
        const {coffeeId,rating,comment}=req.body;
        const userId = req.user.id;

        const result = await ReviewService.createReview(userId,coffeeId,rating,comment);

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: result,
        });
    } catch (error: any){
        res.status(400).json({
        success: false,
        message: error.message,
      });
    }
};

const getCoffeeReviews= async(req: Request, res:Response)=>{
    const {id} = req.params;

    const result = await ReviewService.getCoffeeReviews(id as string);

    res.status(200).json({
    success: true,
    data: result,
  });
};

export const ReviewController={
    createReview,
    getCoffeeReviews,
}