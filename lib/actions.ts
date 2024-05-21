"use server";

import prisma from "./prisma";

interface ClientData {
  name: string;
  address: string;
  phone: number;
  // total: number;
  totalDue: number;
}

interface ItemData {
  name: string;
  price: number;
  quantity: number;
}

interface PaymentData {
  paid: number;
}

interface ClientWithItemsAndPayments {
  clientData: ClientData;
  itemsData: ItemData[];
  paymentsData: PaymentData[];
}

interface ClientsResponse {
  clients: ClientData[];
  // error?: any; // Use a more specific type if possible
}

export const getUser = async (): Promise<ClientsResponse> => {
  const clients = await prisma.client.findMany({
    select: {
      name: true,
      address: true,
      phone: true,
      // total: true,
      totalDue: true,
    },
  });
  console.log("end: ", { clients });
  return { clients };
};
