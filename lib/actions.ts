"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { createClientWithItemsAndPayments } from "./cru";
import { redirect } from "next/navigation";

export interface ClientData {
  name: string;
  address: string;
  phone: number;
  total: number;
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
      total: true,
      totalDue: true,
    },
  });
  // console.log("end: ", { clients });
  revalidatePath("/clients");
  return { clients };
};

// export async function createClientWithItemsAndPaymentsActions(
//   data: ClientWithItemsAndPayments
// ) {
//   await createClientWithItemsAndPayments(data);
//   revalidatePath("/clients");
//   redirect("/clients");
// }
