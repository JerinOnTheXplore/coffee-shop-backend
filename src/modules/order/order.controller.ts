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
    try{
        const userId= req.user.id;
    const { page, limit, status } = req.query;
    const result = await OrderService.getMyOrders(userId,{
        page:page,
        limit: limit ,
        status:status as OrderStatus
    });
      res.json({ success: true, ...result });
    } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
    }    
};

const getAllOrders= async(req:Request,res:Response)=>{
    try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const status = req.query.status as OrderStatus | undefined;

    const result = await OrderService.getAllOrders({
      page,
      limit,
      status,
    });

    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
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