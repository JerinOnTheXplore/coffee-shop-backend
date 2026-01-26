import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type OrderItemPayload = {
    coffeeId: string;
    quantity: number;
};

const createOrder = async (
    userId:string,
    items: OrderItemPayload[]
)=>{
    if(!items || items.length ===0){
        throw new Error("Order items required..");
    }

    let totalAmount=0;

    //price calcucalate..
    const orderItemsData:any =[];

    for (const item of items){
        const coffee= await prisma.coffee.findUnique({
            where: {id: item.coffeeId},
        });

        if(!coffee || !coffee.isAvailable){
            throw new Error ("Coffee not available..");
        }
        const itemTotal = coffee.price * item.quantity;
        totalAmount += itemTotal;

        orderItemsData.push({
            coffeeId: coffee.id,
            quantity: item.quantity,
            price: coffee.price,
        });
    }
//transaction..
    return prisma.$transaction(async(tx)=>{
        const order=await tx.order.create({
            data: {
                userId,
                totalAmount,
                items:{
                    create: orderItemsData,
                },
            },
            include:{
                items:true,
            },
        });
        return order;
    });
};

const getMyOrders = async(userId:string)=>{
    return prisma.order.findMany({
        where:{userId},
        include:{
            items:{
                include:{
                    coffee:{select:{name:true}},
                },
            },
        },
        orderBy:{createdAt:"desc"},
    });
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true } },
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateOrderStatus = async(
    orderId: string,
    status: OrderStatus
)=>{
    //order exist korche kina..
    const order= await prisma.order.findUnique({
        where: {id: orderId},
    });

    if(!order){
        throw new Error("Order not found");
    };
    //status update kore..
    return prisma.order.update({
        where: {id:orderId},
        data:{status},
    });
};

export const OrderService = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};