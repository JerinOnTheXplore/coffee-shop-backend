import { error } from "node:console";
import { prisma } from "../../lib/prisma";

const createCoffee = async (adminId: string, payload: any) => {
  return prisma.coffee.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      roastLevel: payload.roastLevel,
      admin: {
        connect: { id: adminId },
      },
    },
  });
};

const getAllCoffees = async () => {
  return prisma.coffee.findMany({
    where: { isAvailable: true },
    include: {
      admin: {
        select: { id: true, name: true },
      },
    },
  });
};

const getSingleCoffee = async (id: string) => {
  return prisma.coffee.findUnique({
    where: { id },
    include: { reviews: true },
  });
};

const updateCoffee =async (
    coffeeId: string,
    adminId: string,
    payload: any
)=>{
    const coffee =await prisma.coffee.findUnique({
        where: {id:coffeeId},
    });

    if(!coffee){
        throw new Error("coffee not found!!");
    }

    if(coffee.adminId !== adminId){
        throw new Error("You are not allowed to update this coffee..!!");
    }

    return prisma.coffee.update({
        where: {id:coffeeId},
        data: payload,
    });
};

const deleteCoffee =async(
    coffeeId:string,
    adminId: string,
)=>{
    const coffee = await prisma.coffee.findUnique({
        where:{id: coffeeId},
    });

    if(!coffee){
        throw new Error("coffee not found...!!");
    }

    if(coffee.adminId !== adminId){
        throw new Error("You are not allowed to delete this coffee..");
    }

    return prisma.coffee.update({
        where: {id:coffeeId},
        data: {isAvailable:false},
    });
};

export const CoffeeService = {
  createCoffee,
  getAllCoffees,
  getSingleCoffee,
  updateCoffee,
  deleteCoffee
};
