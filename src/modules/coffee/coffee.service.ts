import { RoastLevel } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


const createCoffee = async (
  payload: {
    name: string;
    description: string;
    price: number;
    roastLevel: RoastLevel;
    isAvailable?: boolean;
  }
) => {
  
  const fakeAdminId = "00000000-0000-0000-0000-000000000000"; 

  const coffee = await prisma.coffee.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      roastLevel: payload.roastLevel,
      isAvailable: payload.isAvailable ?? true,
      adminId: fakeAdminId,
    },
  });

  return coffee;
};

//get all coffee
const getAllCoffees = async () => {
  const coffees = await prisma.coffee.findMany({
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return coffees;
};





export const coffeeServices = {
  createCoffee,
  getAllCoffees,
  
};
