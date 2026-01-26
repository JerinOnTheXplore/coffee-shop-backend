import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type OrderItemPayload = {
    coffeeId: string;
    quantity: number;
};

interface OrderQueryOptions {
    page?: number | undefined;
    limit?: number | undefined;
    status?: OrderStatus | undefined;
}

const createOrder = async (
    userId:string,
    items: OrderItemPayload[]
)=>{
    if(!items || items.length ===0){
        throw new Error("Order items required..");
    }

    let totalAmount=0;

    //price calcucalate..
    const orderItemsData:any[] =[];

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

const getMyOrders = async(userId:string,options:OrderQueryOptions)=>{
    const page = options.page || 1;
    const limit= options.limit || 10;
    const skip = (page - 1)*limit;
    const whereClause = options.status?{userId,status:options.status}:{userId};

    const orders= await prisma.order.findMany({
        where:whereClause,
        include:{
            items:{
                include:{
                    coffee:{select:{name:true}},
                },
            },
        },
        orderBy:{createdAt:"desc"},
        skip,
        take:limit,
    });
    const total =await prisma.order.count({where: whereClause});

    return {orders,total,page,limit};
};

const getAllOrders = async (options: OrderQueryOptions) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const whereClause = options.status ? { status: options.status } : {};  
  const orders= await prisma.order.findMany({
    where: whereClause,
    include: {
      user: { select: { id: true, name: true } },
      items: true,
    },
    orderBy: { createdAt: "desc" },
    skip,
    take:limit,
  });
  const total = await prisma.order.count({where: whereClause});
  return {orders,total,page,limit};
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