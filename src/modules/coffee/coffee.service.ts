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

export const CoffeeService = {
  createCoffee,
  getAllCoffees,
  getSingleCoffee,
};
