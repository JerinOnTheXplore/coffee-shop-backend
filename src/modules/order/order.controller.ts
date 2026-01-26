import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";



const createOrder = async (req:any,res:Response)=>{
    try{
        const userId= req.user.id;//ekhane id e hobe...userId dile undefined karon jwt decode kore req.user = {
//   id: "some-uuid",
//   role: "CUSTOMER",
//   email: "..."
// }  emon shape e data rakhe...
        const {items} = req.body;

        const result = await OrderService.createOrder(userId,items);

        res.status(201).json({
            success: true,
            message: "Order placed successfully..",
            data:result,
        });
    } catch(error:any){
        res.status(400).json({
        success: false,
        message: error.message,
        });
    }
};

const getMyOrders= async(req:any,res:Response)=>{
    const userId= req.user.userId;
    const result = await OrderService.getMyOrders(userId);

    res.status(200).json({
    success: true,
    data: result,
  });
};

const getAllOrders= async(req:Request,res:Response)=>{
    const result= await OrderService.getAllOrders();

    res.status(200).json({
        success:true,
        data:result,
    });
};

const updateOrderStatus =async(req:Request, res:Response)=>{
    try{
        const {id}= req.params;
        const {status}= req.body;
        //basic validation..
        if(!status || !Object.values(OrderStatus).includes(status)){
            return res.status(400).json({
                success:false,
                message:"invalid order status!!",
            });
        }

        const updatedOrder = await OrderService.updateOrderStatus(
            id as string,
            status
        );
        res.json({
            success: true,
            data: updatedOrder,
        });
    } catch (error:any){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const orderController = {
 createOrder,
 getMyOrders,
 getAllOrders,
 updateOrderStatus,
}